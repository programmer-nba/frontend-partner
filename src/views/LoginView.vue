<template>
  <div class="flex h-screen w-full items-center justify-center bg-[#F1E7E0]  bg-no-repeat my-background">
    <div class="rounded-xl bg-white px-16 py-6 lg:py-10 shadow-lg backdrop-blur-md sm:py-5 mx-10 xl:mr-0">
      <form>
      <div class="text-center">
        <div class="mb-4 flex flex-col items-center">
          <h1 class="text-black text-4xl m-5"> </h1>
          <h1 class="mb-2 text-3xl font-bold text-[#342A4C]"> ยินดีต้อนรับเข้าสู่ระบบ Partner</h1>
        </div>
        <div class="mb-4 text-lg ">
          <input v-model="username"
            class="rounded-3xl  px-4 py-2 border border-solid border-gray-500  text-inherit  shadow-lg outline-none backdrop-blur-md w-full placeholder-slate-900"
            type="text" name="name" placeholder="ชื่อผู้ใช้" />
        </div>
        <div class="mb-4 text-lg ">
          <input v-model="password"
            class="rounded-3xl  px-4 py-2 border border-solid border-gray-500 text-inherit  shadow-lg outline-none backdrop-blur-md w-full placeholder-slate-900"
            type="Password" name="password" placeholder="รหัสผ่าน"  />
        </div>
        <div class="mt-4 flex justify-center text-md text-black">
          <Button type="submit"
            class=" text-center rounded-3xl bg-pink-500 px-8 py-3 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-pink-600 hover:text-[#F1E7E0] w-full "
            @click="checklogin()" :loading="isLoading" label="ล็อคอิน" />
           
        </div>
        <div class="mt-4 flex justify-center text-md text-black">
        
            <Register></Register>
        </div>

      </div>
      </form>
    </div>
  </div>
  <Dialog
    v-model:visible="dialog_otp"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="font"
  >
  <template #header>
      <span
        class="text-pink-500 font-bold"
        style="font-size: 1.25rem; font-weight: 700"
        >ส่ง otp เพื่อยืนยันตัวตนในการสมาชิกครั้งแรก </span
      >
      
    </template>
    <div class="grid">
        <div class="col-12 ">
          <input v-model="otp"
            class="rounded-3xl  px-4 py-2 border border-solid border-gray-500  text-inherit  shadow-lg outline-none backdrop-blur-md w-full placeholder-slate-900"
            type="text" name="name" placeholder="กรุณากรอก otp " />
      </div>
      <div class="col-12" >
        <Button class=" text-center rounded-3xl bg-pink-500 px-8 py-3 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-pink-600 hover:text-[#F1E7E0] w-full "
          @click="checkotp()" :loading="isLoading" label="ยืนยันตัวตน" />

      </div>

      </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Register from './Register.vue';
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { Partner } from "@/service/partner";
const isLoading = ref(false);
const username = ref('');
const password = ref('');
const $stores = useStore();
const $toast = useToast();
const $confirm = useConfirm();
const loading = ref(false);

const dialog_otp = ref(false);
const partner = new Partner();
const otp = ref("");
const tokenotp = ref("");

const _id =ref("");
const token2 = ref({});
document.title = "ระบบสมาชิก partner";
const checklogin = async () => {


  if (username.value === '' || password.value === '') {
    $toast.add({
      severity: 'info',
      summary: 'แจ้งเตือน',
      detail: 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน',
      life: 3000,
    });
    return false;
  }

  isLoading.value = true;
  
  try {
    const res = await axios.post(`${process.env.VUE_APP_API}/partner/login`, {
      username: username.value,
      password: password.value,
    });
   
    if (res.data.status === true) {
      
        if(res.data.data.status_otp == false)
        {
         
          isLoading.value = false;
         
          await sendotp(res.data.data._id)
            
          _id.value = res.data.data._id;
          token2.value = res.data.token;
          
        }else{
          isLoading.value = false;
          $toast.add({
            severity: 'success',
            summary: 'เข้าสู่ระบบสำเร็จ',
            detail: 'ยินดีต้อนรับสู่ระบบ Partner',
            life: 3000,
            });
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
            window.location.assign('/');
        }
       
      
    } else {
      isLoading.value = false;
      $toast.add({
        severity: 'error',
        summary: 'เข้าสู่ระบบไม่สำเร็จ',
        detail: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        life: 3000,
      });
    }
  } catch (error) {
    isLoading.value = false;
    $toast.add({
      severity: 'error',
      summary: 'เข้าสู่ระบบไม่สำเร็จ',
      detail: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
      life: 3000,
    });
  }
};

const sendotp = async(id)=>{
 
  await partner.Sendopt(id).then(async (res) => {
    
    console.log(res)
    console.log(res?.result?.token);
    tokenotp.value = res?.result?.token
    otp.value = "";
    dialog_otp.value = true; 
  })
}
const checkotp = async()=>{
  if (otp.value =='') 
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
    message: "ยืนยันการส่ง otp ใช่หรือไม่ ?",
    header: "ส่ง otp",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "bg-red-500 border-none",
    acceptClass: "bg-blue-500 border-none",
    acceptLabel: "ตกลง",
    rejectLabel: "ยกเลิก",
    accept: async () => {
      isLoading.value = true;
      const data = {
        token:tokenotp.value,
        otp_code:otp.value,
      }

      await partner.Check(data,_id.value).then(async (res) => {
        if (res.status == true) {
          $toast.add({
              severity: "warn",
              summary: "การยืนยันสำเร็จ",
              detail: "ยืนยันสำเร็จ",
              life: 3000,
            });
           
            localStorage.setItem('token', token2.value);
            window.location.assign('/');
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
      
      isLoading.value = false;
    
    },

  });
}


</script>

<style >
body{
  margin: 0;
}
.my-background {
  background-image: url('../assets/background.jpg');
  background-size: cover;

}


@media screen and (min-width: 1024px) {
  .xl\:mr-32 {
    margin-left: 60%;
    margin-top: 7%;
    background-size: contain;

  }
}

/* Phone */
@media screen and (max-width:576px) {
  /* .my-background {
    background-image: url('../assets/background.jpg');
    background-size: contain;
  } */

  .xl\:mr-32 {
    margin-top: 60%;
    background-size: contain;
  }
}

/* Tablet */
@media screen and (max-width:768px) {}

/* Big Tablet */
@media screen and (max-width:992px) {
  /* .my-background {
    background-image: url('../assets/background.jpg');
    background-size: contain;
  } */

  .xl\:mr-32 {
    margin-top: 50%;
    background-size: contain;
  }
}

/* Desktop */
@media screen and (max-width:1200px) {}

/* Big Desktop */
@media screen and (max-width:1400px) {}


/**/



</style>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
