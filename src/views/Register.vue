<template>
  


    <button type="button" @click="opendialog()" :loading="loading" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"> 
   สมัครสมาชิก
    </button>

    
    <Dialog
    v-model:visible="dialog"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="font"
  >
    <template #header>
      <span
        class="text-pink-500 font-bold"
        style="font-size: 1.25rem; font-weight: 700"
        >สมัครสมาชิก</span
      >
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <p>username:</p>
        <InputText
          v-model="partners.username"
          placeholder="กรุณากรอก username"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-6">
        <p>password:</p>
        <InputText
        type="password"
          v-model="partners.password"
          placeholder="กรุณากรอก password"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-4">
        <p>คำนำหน้า:</p>
        <Dropdown
          v-model="partners.antecedent"
          :options="optionantecedent"
          optionLabel="name"
          optionValue="name"
          class="w-full"
          :disabled="loading"
          placeholder="กรุณาเลือกคำนำหน้า"
        />
      </div>
      <div class="col-12 md:col-8">
        <p>ชื่อ - สกุล:</p>
        <InputText
          v-model="partners.partner_name"
          placeholder="กรุณากรอกชื่อ - สกุล"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12">
        <p>ที่อยู่:</p>
        <InputText
          v-model="partners.partner_address"
          placeholder="กรุณากรอกที่อยู่"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-6">
        <p>เบอร์โทรศัพท์:</p>
        <InputText
          type="number"
          v-model="partners.partner_phone"
          placeholder="กรุณากรอกเบอร์โทรศัพท์"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      
      <div class="col-12 md:col-6">
        <p>บัตรประชาชน:</p>
        <InputText
          type = "number"
          v-model="partners.partner_iden_number"
          placeholder="กรุณากรอกบัตรประชาชน"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12" >
        <p>อีเมล์:</p>
        <InputText
          v-model="partners.partner_email"
          placeholder="กรุณากรอกบัตรประชาชน"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      
      <!-- 
        <div class="col-12 md:col-6">
        <p>ชื่อบัญชี:</p>
        <InputText
          v-model="partners.partner_bookbank_name"
          placeholder="กรุณากรอกชื่อบัญชี"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-6">
        <p>เลขบัญชี:</p>
        <InputText
          type="number"
          v-model="partners.partner_bookbank_number"
          placeholder="กรุณากรอกเลขบัญชี"
          class="w-full font"
          :disabled="loading"
        />
      </div>
        <div class="col-12 md:col-6">
         <p>แนบเลขบัญชี:</p>
         <FileUpload
          mode="basic"
          name="demo[]" url="/api/upload"
          chooseLabel="เลือกไฟล์เลขบัญชี"
          :auto="true"
          class="mt-4 font bg-blue-700 border-none hover:bg-blue-600"
          @uploader="choosebookbank"
          :customUpload="true"
          :fileLimit="1"
          :disabled="loading"
          v-if="partners.partner_bookbank ==''"
        />
        <div v-else class="text-2xl text-blue-700">  คุณได้เลือกไฟล์แล้ว</div>
      </div>
      <div class="col-12 md:col-6">
        <p>ชื่อบริษัท:</p>
        <InputText
          v-model="partners.partner_company_name"
          placeholder="กรุณากรอกชื่อบริษัท"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12 md:col-6">
        <p>เลขประจำตัวผู้เสียภาษี:</p>
        <InputText
          type="number"
          v-model="partners.partner_company_number"
          placeholder="กรุณากรอกเลขประจำตัวผู้เสียภาษี"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12">
        <p>ที่อยู่บริษัท:</p>
        <InputText
          v-model="partners.partner_company_address"
          placeholder="กรุณากรอกที่อยู่"
          class="w-full font"
          :disabled="loading"
        />
      </div>
      <div class="col-12  md:col-6">
         <p>แนบเลขบัตรประชาชน:</p>
         <FileUpload
          mode="basic"
          name="demo[]" url="/api/upload"
          chooseLabel="เลือกไฟล์บัตรประชาชน"
          :auto="true"
          class="mt-4 font bg-blue-700 border-none hover:bg-blue-600"
          @uploader="chooseiden"
          :customUpload="true"
          :fileLimit="1"
          :disabled="loading"
          v-if="partners.partner_iden ==''"
        />
        <div v-else class="text-2xl text-blue-700">  คุณได้เลือกไฟล์แล้ว</div>
      </div>
      <div class="col-12">
         <p>แนบลายเซ็นต์:</p>
         <FileUpload
          mode="basic"
          name="demo[]" url="/api/upload"
          chooseLabel="เลือกไฟล์ลายเซ็นต์"
          :auto="true"
          class="mt-4 font bg-blue-700 border-none hover:bg-blue-600"
          @uploader="choosesignature"
          :customUpload="true"
          :fileLimit="1"
          :disabled="loading"
          v-if="partners.signature ==''"
        />
        <div v-else class="text-2xl text-blue-700">  คุณได้เลือกไฟล์แล้ว</div>
      </div>    -->

      <!-- <div class="col-12 md:col-6">
        <p>เลือกหมวดหมู่สินค้า:</p>
        <Dropdown
          v-model="product_dialog.producttype"
          :options="optionproducttype"
          optionLabel="name"
          optionValue="_id"
          class="w-full"
          :disabled="loading"
          placeholder="กรุณาเลือกหมวดหมู่สินค้า"
        />
      </div> -->
    </div>

    <div class="grid mt-4">
      <div class="col-12 text-center">
        <Button
          label="บันทึก"
          class="mr-2"
          severity="success"
          :loading="loading"
          @click=" adddata()"
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
    import { Partner } from "@/service/partner";
    import store from "@/store";
    // กำหนดตัวแปร
    const partner = new Partner();
    const $stores = useStore();
    const $toast = useToast();
    const $confirm = useConfirm();
    const list_user = ref([]);
    const dialog = ref(false);
    const title_dialog = ref("");
    const loading = ref(false);
    const optionantecedent =  [
      {name:"นาย"},
      {name:"นาง"},
      {name:"นางสาว"}
    ]
    const partners = ref({
        username: "",  
        password: "",
        antecedent:"",
        partner_name: "", // ชื่อ - นามสกุล
        partner_address: "", //ที่อยู่
        partner_phone: "", //เบอร์
        partner_iden_number: "", // บัตรประชาชน
        partner_email:"",

        partner_bookbank_name: "", // ชื่อบัญชี
        partner_bookbank_number: "", //เลขบัญชี
      
       
        partner_company_name: "", // ชื่อบริษัท
        partner_company_number: "", // เลขประจำตัวผู้เสียภาษี
        partner_company_address: "", //ที่อยู่บริษัท

        partner_bookbank: "", // images
        partner_iden: "", // images
        signature:"" // ลายเซ็น
    })
    const choosebookbank = async (event)=>{
      // partners.value.imagepreview = event.files[0].objectURL;
      partners.value.partner_bookbank = event.files[0];
    }

    const chooseiden = async (event)=>{
      partners.value.partner_iden = event.files[0];
    }
    const choosesignature = async (event)=>{
      partners.value.signature = event.files[0];
    }
    const adddata = async () => {
  if (partners.value.username == "" ||  partners.value.password == "" || partners.value.antecedent =="" ||
    partners.value.partner_name == "" || partners.value.partner_address == "" || partners.value.partner_phone == "" ||
    partners.value.partner_iden_number == "" ||partners.value.partner_email =="") 
    {
      
    $toast.add({
      severity: "warn",
      summary: "แจ้งเตือน",
      detail: "กรุณากรอกข้อมูลให้ครบ",
      life: 3000,
    });
    return false;
  }


  $confirm.require({
    message: "ต้องการสมัคร partner ใช่หรือไม่ ?",
    header: "สมัคร partner",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "bg-red-500 border-none",
    acceptClass: "bg-blue-500 border-none",
    acceptLabel: "ตกลง",
    rejectLabel: "ยกเลิก",
    accept: async () => {
      loading.value = true;
      const data = {
        username: partners.value.username,
        password: partners.value.password,
        antecedent:partners.value.antecedent,
        partner_name: partners.value.partner_name,
        partner_address: partners.value.partner_address,
        partner_phone: partners.value.partner_phone,
        partner_iden_number: partners.value.partner_iden_number,
        partner_email: partners.value.partner_email,
      }
      await partner.AddPartner(data).then(async (res) => {
        if (res.status == true) {
          $toast.add({
            severity: "success",
            summary: "แจ้งเตือน",
            detail: "สมัครสมาชิกสำเร็จ",
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
      });
      
      
      loading.value = false;
    
    },

  });
};
  const add2 = async(res)=>{

    await partner.AddPartner2(res.data).then(async (res) => {
        if (res.status == true) {
          
          dialog.value = false;
          $toast.add({
            severity: "success",
            summary: "แจ้งเตือน",
            detail: "สมัครสมาชิกสำเร็จ กรุณารอการยืนยันจาก admin",
            life: 3000,
          });
        } else {
          if (res?.response?.status == 409) {
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
      });
  }
  const addbank = async(item,id)=>{
    const formData = new FormData();
    formData.append("file", item);
    await partner.AddBankBook(formData,id).then(async (res) => {
        console.log("ส่งสำเร็จรูปสำเร็จ")
    });
  }
  const addidcard = async(item,id)=>{
    const formData = new FormData();
    formData.append("file", item);
    await partner.AddIdcard(formData,id).then(async (res) => {
        console.log("ส่งสำเร็จรูปสำเร็จ")
    });
  }
  const addsignature = async(item,id) =>{
    const formData = new FormData();
    formData.append("file", item);
    await partner.AddSignature(formData,id).then(async (res) => {
        console.log("ส่งสำเร็จรูปสำเร็จ")
    });
  }
  const getImage = (item) => {
        return `https://drive.google.com/thumbnail?id=${item}`;
    };
    const opendialog =()=>{
      dialog.value = true; 
      partners.value.username = "";  
      partners.value.password = "";
      partners.value.partner_name = ""; // ชื่อ - นามสกุล
      partners.value.partner_address = ""; //ที่อยู่
      partners.value.partner_phone = ""; //เบอร์
      partners.value.partner_bookbank_name = ""; // ชื่อบัญชี
      partners.value.partner_bookbank_number = ""; //เลขบัญชี
      partners.value.partner_iden_number = ""; // บัตรประชาชน
      partners.value.partner_company_name=  ""; // ชื่อบริษัท
      partners.value.partner_company_number = ""; // เลขประจำตัวผู้เสียภาษี
      partners.value.partner_company_address = ""; //ที่อยู่บริษัท

      partners.value.partner_bookbank = ""; // images
      partners.value.partner_iden = ""; // images
      partners.value.signature =""; // ลายเซ็น   
    }
</script>


<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>