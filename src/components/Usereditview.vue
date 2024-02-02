<template>
    <div v-if="$stores.getters.isLoading == true" class="loading">
        Loading
    </div>
    <div class="grid mt-2 bg-white mx-3">
        <div class="text-center col-12 ">
            <h1 class="text-blue-700">ข้อมูลส่วนตัว</h1>
        <hr class="border-blue-700 border-2 ">
        <div class="image">
        <Image
          v-if="list_user.image != null&& list_user.image !=''"
          :src="getImage(list_user.image)"
          alt="image"
          width="300"
          preview
        />
        <div v-else>ไม่มีรูปภาพ</div>
        </div>
        <h2 class="text-center name mt-3">ชื่อ : {{ list_user.firstname }} {{list_user.lastname}}</h2>
        <h2 class="text-center name mt-3">ชื่อเล่น : {{ list_user.nickname }}</h2>
        <h2 class="text-center name mt-3">ตำแหน่ง : {{ list_user.position }}</h2>
         <hr class="border-blue-700 border-2 ">
        <Button class="font m-4 bg-blue-700 border-none hover:bg-blue-600" @click="dialog=true">แก้ไขข้อมูลส่วนตัว</Button>
        </div>
    </div>

<Dialog
    v-model:visible="dialog"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="font"
  >
    <template #header>
      <span
        class="text-blue-700 font-bold"
        style="font-size: 1.25rem; font-weight: 700"
        >แก้ไขข้อมูลส่วนตัว</span>
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <p>username:</p>
        <InputText
          v-model="user_dialog.username"
          placeholder="กรุณากรอกusername"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-6">
        <p>password: (ถ้าไม่เปลี่ยนรหัสผ่านไม่ต้องกรอก)</p>
        <InputText
          v-model="user_dialog.password"
          type="password"
          placeholder="กรุณากรอก password"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-6">
        <p>ชื่อจริง:</p>
        <InputText
          v-model="user_dialog.firstname"
          placeholder="กรุณากรอกชื่อจริง"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-6">
        <p>นามสกุล:</p>
        <InputText
          v-model="user_dialog.lastname"
          placeholder="กรุณากรอกนามสกุล"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 ">
        <p>ชื่อเล่น:</p>
        <InputText
          v-model="user_dialog.nickname"
          placeholder="กรุณากรอกชื่อเล่น"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 text-center mt-4">
        <Image
          :src="getImage(user_dialog.imageold)"
          width="250"
          v-if="user_dialog.imageold !== '' && user_dialog.imagepreview == null"
          :preview="true"
        />
        <Image
          :src="user_dialog.imagepreview"
          width="250"
          v-if="user_dialog.imagepreview !== null"
          :preview="true"
        />
        <FileUpload
          mode="basic"
          chooseLabel="เลือกรูปผู้ใช้งาน"
          :auto="true"
          class="mt-4 font bg-blue-700 border-none hover:bg-blue-600"
          @uploader="chooseImg"
          :customUpload="true"
          accept="image/png, image/jpeg,image/jpg"
          :fileLimit="1"
          :maxFileSize="2097152"
          invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
          :disabled="loading"
        />
        <p><em>(ขนาดจะต้องเป็น 1:1)</em></p>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 text-center">
        <Button
          label="บันทึก"
          class="mr-2"
          severity="success"
          :loading="loading"
          @click="editdata()"
        />
        <Button label="ยกเลิก" severity="danger" @click="dialog = false" />
      </div>
    </div>
  </Dialog>
</template>
<script setup>
    import { ref, onMounted, computed,watchEffect } from "vue";
    import { useStore } from "vuex";
    import { useToast } from "primevue/usetoast";
    import { useConfirm } from "primevue/useconfirm";
    import "@/components/loadingStyle.css";
    import { Admin } from "@/service/admin";
    import store from "@/store";
    // กำหนดตัวแปร
    const admin = new Admin();
    const $stores = useStore();
    const $toast = useToast();
    const $confirm = useConfirm();
    const list_user = ref([]);
    const dialog = ref(false);
    const title_dialog = ref("");
    const loading = ref(false);
    // v-model
    const user_dialog = ref({
        _id: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        nickname: "",
        position: "",
        image: "",
        imagepreview: null,
        imageold: list_user.value.image,
    });
    //ฟังก์ชั่น
    const getData = async () => {
        await admin.GetUserbyid($stores.getters._id).then((result) => {
            list_user.value = result.data;
        });
    };
    const getImage = (item) => {
    return `https://drive.google.com/thumbnail?id=${item}`;
    };
    const chooseImg = (event) => {
        user_dialog.value.imagepreview = event.files[0].objectURL;
        user_dialog.value.image = event.files[0];
    };
    //แก้ไข
    const editdata = async () => {
  if (
    user_dialog.value.username == "" ||
    user_dialog.value.firstname == "" ||
    user_dialog.value.lastname == "" ||
    user_dialog.value.nickname == "" ||
    user_dialog.value.position == "" ||
    user_dialog.value.position == "เลือกตำแหน่ง"
  ) {
    $toast.add({
      severity: "warn",
      summary: "แจ้งเตือน",
      detail: "กรุณากรอกข้อมูลให้ครบ",
      life: 3000,
    });
    return false;
  }
  $confirm.require({
    message: "ต้องการแก้ไขข้อมูลผู้ใช้งานใช่หรือไม่ ?",
    header: "แก้ไขข้อมูลผู้ใช้งาน",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "bg-red-500 border-none",
    acceptClass: "bg-blue-500 border-none",
    acceptLabel: "ตกลง",
    rejectLabel: "ยกเลิก",
    accept: async () => {
      loading.value = true;
      const formData = new FormData();
      formData.append("username", user_dialog.value.username);
      formData.append("password", user_dialog.value.password);
      formData.append("firstname", user_dialog.value.firstname);
      formData.append("lastname", user_dialog.value.lastname);
      formData.append("nickname", user_dialog.value.nickname);
      formData.append("position", user_dialog.value.position);
      if (user_dialog.value.image != "") {
        formData.append("image", user_dialog.value.image);
      }

      await admin.EditUser(formData, user_dialog.value._id).then(
        async (res) => {
          if (res.status == true) {
            await getData();
            dialog.value = false;
            $toast.add({
              severity: "success",
              summary: "แจ้งเตือน",
              detail: "แก้ไขข้อมูลผู้ใช้งานสำเร็จ",
              life: 3000,
            });
          } else {
            if (res.response.status == 409) {
              $toast.add({
                severity: "warn",
                summary: "แจ้งเตือน",
                detail: res.response.data.message,
                life: 3000,
              });
            } else {
              $toast.add({
                severity: "warn",
                summary: "แจ้งเตือน",
                detail: res.message,
                life: 3000,
              });
            }
          }
        }
      );
      loading.value = false;
    },
  });
};
    //เมื่อ dialogปิดให้ทำฟังก์ชั่นนี้
    watchEffect(() => {
        if(dialog.value == true)
        {
           user_dialog.value._id = list_user.value._id
           user_dialog.value.username = list_user.value.username
           user_dialog.value.firstname = list_user.value.firstname
           user_dialog.value.lastname = list_user.value.lastname
           user_dialog.value.nickname = list_user.value.nickname
           user_dialog.value.position = $stores.getters.position
           user_dialog.value.imageold = list_user.value.image
        }
       
    });
    // เมื่อเริ่มใช้งาน
    onMounted(async () => {
        document.title = "กำหนดสิทธิ์ผู้ใช้งาน | SmartPro";
        $stores.commit("openLoading");
        await getData();
        $stores.commit("closeLoading");
    });
</script>
