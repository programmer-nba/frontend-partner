<template>
  <div v-if="loading" class="overlay">
    <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>

  <button type="button" @click="opendialog()" :loading="loading"
    class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
    สมัครสมาชิก
  </button>


  <Dialog v-model:visible="dialog" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="font">
    <template #header>
      <span class="text-[#146356] font-bold" style="font-size: 1.25rem; font-weight: 700">สมัครสมาชิก</span>
    </template>

    <div class="max-w-2xl mx-auto bg-white p-16">


      <div class="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">username</label>
          <input v-model="partners.username" :disabled="loading" type="text" placeholder="กรุณากรอก username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   ">
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">password</label>
          <input v-model="partners.password" type="password" :disabled="loading" placeholder="กรุณากรอก password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3  ">
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">คำนำหน้า</label>
          <Dropdown v-model="partners.antecedent" :options="optionantecedent" optionLabel="name" optionValue="name"
            :disabled="loading" placeholder="กรุณาเลือกคำนำหน้า"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full" />
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ชื่อ - สกุล</label>
          <input type="text" v-model="partners.partner_name" placeholder="กรุณากรอกชื่อ - สกุล" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ที่อยู่</label>
          <input type="text" v-model="partners.partner_address" placeholder="กรุณากรอกที่อยู่" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">จังหวัด</label>
          <Dropdown v-model="partners.partner_province" :options="optionprovince" optionLabel="name_th" optionValue="name_th"
            :disabled="loading" placeholder="กรุณาเลือกจังหวัด" filter @change="chooseprovice()"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full " />

        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">อำเภอ</label>
          <Dropdown v-model="partners.partner_amphure" :options="optionamphure" optionLabel="name_th" optionValue="name_th"
            :disabled="loading" placeholder="กรุณาเลือกอำเภอ" filter @change="chooseamphure()"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ตำบล</label>
          <Dropdown v-model="partners.partner_district" :options="optiondistrict" optionLabel="name_th" optionValue="name_th"
            :disabled="loading" placeholder="กรุณาเลือกตำบล" filter @change="choosedistrict()"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสไปรษณีย์</label>
          <input type="text" :disabled="loading" v-model="partners.partner_postcode" placeholder="กรุณากรอกเบอร์โทรศัพท์"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" readonly="true">
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">เบอร์โทรศัพท์</label>
          <input type="text" :disabled="loading" v-model="partners.partner_phone" placeholder="กรุณากรอกเบอร์โทรศัพท์"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">บัตรประชาชน</label>
          <input type="number" v-model="partners.partner_iden_number" placeholder="กรุณากรอกบัตรประชาชน"
            :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
        </div>
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">อีเมล์</label>
          <input type="text" v-model="partners.partner_email" placeholder="กรุณากรอกอีเมล์" :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
        </div>
      </div>
      <button   :loading="loading"
          @click=" adddata()"
        class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
        focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">บันทึก</button>



    </div>
  </Dialog>
</template>

<script setup>
import "@/components/loadingStyle.css";
import { Partner } from "@/service/partner";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { ref ,onMounted} from "vue";
import { useStore } from "vuex";
// กำหนดตัวแปร
const partner = new Partner();
const $stores = useStore();
const $toast = useToast();
const $confirm = useConfirm();
const list_user = ref([]);
const dialog = ref(false);
const title_dialog = ref("");
const loading = ref(false);
const optionantecedent = [
  { name: "นาย" },
  { name: "นาง" },
  { name: "นางสาว" }
]
const partners = ref({
  username: "",
  password: "",
  antecedent: "",
  partner_name: "", // ชื่อ - นามสกุล
  partner_address: "", //ที่อยู่
  partner_phone: "", //เบอร์
  partner_iden_number: "", // บัตรประชาชน
  partner_email: "",

  partner_bookbank_name: "", // ชื่อบัญชี
  partner_bookbank_number: "", //เลขบัญชี


  partner_company_name: "", // ชื่อบริษัท
  partner_company_number: "", // เลขประจำตัวผู้เสียภาษี
  partner_company_address: "", //ที่อยู่บริษัท

  partner_bookbank: "", // images
  partner_iden: "", // images
  signature: "", // ลายเซ็น

  partner_province:"", //จังหวัด
  partner_district: "", //ตำบล
  partner_amphure: "", //อำเภอ
  partner_postcode:"",
   
})

const adddata = async () => {
  if (partners.value.username == "" || partners.value.password == "" || partners.value.antecedent == "" ||
    partners.value.partner_name == "" || partners.value.partner_address == "" || partners.value.partner_phone == "" ||
    partners.value.partner_iden_number == "" || partners.value.partner_email == "") {

    $toast.add({
      severity: "warn",
      summary: "แจ้งเตือน",
      detail: "กรุณากรอกข้อมูลให้ครบ",
      life: 3000,
    });
    return false;
  }

      loading.value = true;
      const data = {
        username: partners.value.username,
        password: partners.value.password,
        antecedent: partners.value.antecedent,
        partner_name: partners.value.partner_name,
        partner_address: partners.value.partner_address,
        partner_province: partners.value.partner_province,
        partner_amphure: partners.value.partner_amphure,
        partner_district: partners.value.partner_district,
        partner_postcode: partners.value.partner_postcode,
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
          dialog.value = false;
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

    
};
const getImage = (item) => {
  return `https://drive.google.com/thumbnail?id=${item}`;
};
const opendialog = () => {
  dialog.value = true;
  partners.value.username = "";
  partners.value.password = "";
  partners.value.partner_name = ""; // ชื่อ - นามสกุล
  partners.value.partner_address = ""; //ที่อยู่
  partners.value.partner_phone = ""; //เบอร์
  partners.value.partner_bookbank_name = ""; // ชื่อบัญชี
  partners.value.partner_bookbank_number = ""; //เลขบัญชี
  partners.value.partner_iden_number = ""; // บัตรประชาชน
  partners.value.partner_company_name = ""; // ชื่อบริษัท
  partners.value.partner_company_number = ""; // เลขประจำตัวผู้เสียภาษี
  partners.value.partner_company_address = ""; //ที่อยู่บริษัท

  partners.value.partner_bookbank = ""; // images
  partners.value.partner_iden = ""; // images
  partners.value.signature = ""; // ลายเซ็น   
}

const optionprovince = ref([]);
onMounted(async () => {
  loading.value = true;
  await partner.GetProvince().then(async (res) => {
   optionprovince.value = res;
  });
  loading.value = false;
});
const optionamphure = ref([]);
const chooseprovice = ()=>{
 
  const provice =optionprovince.value.find((item)=>{
    return item.name_th == partners.value.partner_province
  })


  partner.GetAmphure(provice.id).then(async (res) => {
    optionamphure.value = res.filter((el) => el.province_id === provice.id);
  });

}

const optiondistrict = ref([]);
const chooseamphure = ()=>{
  const amphure =optionamphure.value.find((item)=>{
    return item.name_th == partners.value.partner_amphure
  })
  partner.GetTambon(amphure.id).then(async (res) => {
    optiondistrict.value = res.filter((el) => el.amphure_id === amphure.id);
  });
}

const choosedistrict = ()=>{
  const district =optiondistrict.value.find((item)=>{
    return item.name_th == partners.value.partner_district
  })
  partners.value.partner_postcode = district.zip_code;
}


</script>


<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>