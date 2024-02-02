<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>


  <!-- <p>Status Partner: {{ status_appover }}</p> -->









  <div class=" bg-[#CFF6CF] min-h-screen">



    <main class="grid grid-cols-1 lg:grid-cols-2 gap-6 py-12  w-2xl container px-2 mx-auto">

      <aside class="">

        <div class="bg-[#064635] shadow rounded-lg p-10 mb-6">
          <section class=" p-2 m-3 rounded">
            <h4 class="text-xl text-white">สถานะการตรวจสอบ</h4>
            <div class="flex flex-col lg:flex-row items-center gap-5 mt-5">
              <div class="flex justify-evenly items-center w-full p-3 m-3 border border-[#A7FF83] rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class=" w-20 h-20" :class="{
                    'text-green-400': status_appover === 'อนุมัติแล้ว',
                    'text-yellow-400': status_appover === 'รออนุมัติ',
                    'text-gray-50': !['ได้รับการอนุมัติแล้ว', 'รออนุมัติ'].includes(status_appover),
                  }">

                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <div class="text-center">
                  <h2 class="text-4xl text-[#A7FF83] font-bold pb-2"> {{
                    status_appover === 'อนุมัติแล้ว' ? '100%' :
                    status_appover === 'รออนุมัติ' ? '50%' :
                      status_appover === 'ยังกรอกข้อมูลไม่ครบ' ? '0%' :
                        ''
                  }}
                  </h2>
                  <h4 class="inline text-[#F1F6F5] text-md"> {{
                    status_appover === 'อนุมัติแล้ว' ?
                    'ได้รับการอนุมัติแล้ว คุณสามารถเข้าใช้ระบบได้' :
                    status_appover === 'รออนุมัติ' ?
                      'กรุณารอแอดมินตรวจสอบข้อมูลของท่าน' :
                      status_appover === 'ยังกรอกข้อมูลไม่ครบ' ?
                        'ท่านยังไม่ได้กรอกข้อมูลการลงนาม' :
                        ''
                  }}
                  </h4>
                </div>
              </div>


            </div>
          </section>
        </div>




        <div class="bg-white shadow rounded-lg p-10">
          <div class="flex flex-col gap-1 text-center items-center">
            <img class="h-32 w-32 bg-white p-2 rounded-full shadow mb-4" src="../../assets/000.png">
            <p class="font-semibold">{{ userData.partner_name }}</p>
            <div class="text-sm leading-normal text-gray-400 flex justify-center items-center">


            </div>
          </div>
          <div class="flex justify-center items-center gap-2 my-3">
            <button @click="showDialog" class="mt-6 block w-full select-none rounded-lg bg-[#285430] py-3 px-6 text-center 
        align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#ADE792] transition-all 
        hover:shadow-lg hover:shadow-[#CFFF8D] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
        active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              เพิ่มข้อมูลการลงนาม
            </button>
          </div>
        </div>



      </aside>

      <article class="">

        <form class="bg-[#064635] shadow rounded-lg mb-6 p-4">
          <div class="flex flex-col border border-[#C6FFC1] rounded-lg overflow-hidden ">
            <div class="grid grid-cols-1 sm:grid-cols-4">
              <div class="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
                <p class="text-xl font-bold text-white rounded-full">ข้อมูลลงทะเบียน</p>
              </div>
              <div class="flex flex-col sm:border-l col-span-3">

                <div class="flex flex-col space-y-4  p-6 text-white">
                  <div class="flex flex-row text-sm">
                    <span class="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px"
                        viewBox="0 0 24 24" width="20px" fill="currentColor">
                        <g>
                          <rect fill="none" height="24" width="24" />
                        </g>
                        <g>
                          <path
                            d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
                        </g>
                      </svg>
                    </span>
                    <p class="flex items-center  text-white">
                      <span class=" mr-2 text-xs uppercase">Name:</span>
                      <span>{{ userData.partner_name }} </span>
                    </p>
                  </div>

                  <div class="flex flex-row text-sm">
                    <span class="mr-3">

                      <svg width="20px" height="20px" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                          d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48m0 400H303.2c.9-4.5.8 3.6.8-22.4c0-31.8-30.1-57.6-67.2-57.6c-10.8 0-18.7 8-44.8 8c-26.9 0-33.4-8-44.8-8c-37.1 0-67.2 25.8-67.2 57.6c0 26-.2 17.9.8 22.4H48V144h480zm-168-80h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m-168 96c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64" />
                      </svg>
                    </span>
                    <p class="flex items-center  text-white">
                      <span class=" mr-2 text-xs uppercase">IDCard:</span>
                      <span>{{ userData.partner_iden_number }}</span>
                    </p>
                  </div>
                  <div class="flex flex-row text-sm">
                    <span class="mr-3">

                      <svg width="20px" height="20px" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                          d="M14.5 13h-13C.67 13 0 12.33 0 11.5v-9C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v9c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-9c0-.28-.22-.5-.5-.5z" />
                        <path fill="currentColor"
                          d="M8 8.96c-.7 0-1.34-.28-1.82-.79L.93 2.59c-.19-.2-.18-.52.02-.71c.2-.19.52-.18.71.02l5.25 5.58c.57.61 1.61.61 2.18 0l5.25-5.57c.19-.2.51-.21.71-.02c.2.19.21.51.02.71L9.82 8.18c-.48.51-1.12.79-1.82.79Z" />
                      </svg>
                    </span>
                    <p class="flex items-center  text-white">
                      <span class=" mr-2 text-xs uppercase">E-mail:</span>
                      <span>{{ userData.partner_email }}</span>
                    </p>
                  </div>
                  <div class="flex flex-row text-sm">
                    <span class="mr-3">

                      <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                          d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608a17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                      </svg>
                    </span>
                    <p class="flex items-center  text-white">
                      <span class=" mr-2 text-xs uppercase">Phone:</span>
                      <span>{{ userData.partner_phone }}</span>
                    </p>
                  </div>


                </div>

                <div class="flex flex-col w-full relative bottom-0">
                  <div class="grid grid-cols-1 border-t divide-x text-[#0ed3cf]  bg-gray-50  py-3">


                    <a class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center ">
                      <div class="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px"
                          fill="#0ed3cf">
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                        </svg>
                      </div>
                      ดูเพิ่มเติม
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </form>

        <div class="bg-white shadow rounded-lg mb-6">
          <div class="flex flex-row px-2 py-3 mx-3">

            <div class="flex flex-col mb-2 ml-4 mt-1">
              <div class="text-gray-600 text-sm font-semibold">ประวัติการทำสัญญา</div>
              <div class="flex w-full mt-1">

                <div class="text-gray-400 font-thin text-xs">
                  • 30 seconds ago
                </div>
              </div>
            </div>
          </div>
          <div class="border-b border-gray-100"></div>
          <div class="block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    ชื่อ</th>
                  <th
                    class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    สถานะ</th>
                  <th
                    class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    วันที่
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="partner in partners" :key="partner.id" class="text-gray-700 ">
                  <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {{ partner.partner_name }}</th>
                  <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                      {{ partner.partner_status_promiss }} </span>
                  </td>
                  <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {{ formatThaiDate(partner.createdAt) }}</th>
                </tr>


              </tbody>
            </table>
          </div>
        </div>



      </article>

    </main>

  </div>


  <Dialog v-model:visible="visible" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '750px', 'z-index': 1000 }">
    <div class="max-w-2xl mx-auto bg-white p-16">


<div class="grid gap-6 mb-6 lg:grid-cols-2">
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">username</label>
    <input   type="text" placeholder="กรุณากรอก username"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
  </div>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">password</label>
    <input  type="password"  placeholder="กรุณากรอก password"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
  </div>

  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ชื่อ - สกุล</label>
    <input type="text"  placeholder="กรุณากรอกชื่อ - สกุล" 
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ">
  </div>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ที่อยู่</label>
    <input type="text"  placeholder="กรุณากรอกที่อยู่" 
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
  </div>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">เบอร์โทรศัพท์</label>
    <input type="text" placeholder="กรุณากรอกเบอร์โทรศัพท์"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
  </div>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">บัตรประชาชน</label>
    <input type="number"  placeholder="กรุณากรอกบัตรประชาชน"
      
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
  </div>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">อีเมล์</label>
    <input type="text"  placeholder="กรุณากรอกอีเมล์" 
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
  </div>



</div>



<button  
    @click=" adddata()"
  class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
  focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">บันทึก</button>



</div>
  </Dialog>

</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
  components: {

  },
  data() {
    return {
      status_appover: "",
      isLoading: false,
      userData: {},
      visible: false,

    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    showDialog() {
      this.visible = true;
    },


    async loadUserData() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${process.env.VUE_APP_API}/partner/me`, {
          headers: {
            "token": localStorage.getItem('token'),
          },
        });
        this.status_appover = response.data.data.status_appover;


        this.userData = response.data.data; // กำหนดค่า userData

        console.log("ข้อมูลพาร์ทเนอร์", response.data.data);


      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },


    async confirmLogout() {
      const confirmResult = await Swal.fire({
        text: 'คุณต้องการออกจากระบบหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ออกจากระบบ',
        confirmButtonColor: '#E0144C',
        cancelButtonText: 'ยกเลิก',
      });

      if (confirmResult.isConfirmed) {
        this.logout();
      }
    },

    logout() {
      localStorage.clear();
      this.$store.commit("setLoginDefault");
      this.$router.push("/");


    },
  },
};
</script>

  

<style scoped>
.modal-box {
  max-width: 48rem;
  background-color: #FFD1DA;
  z-index: 0;
}
</style>

<style>
div:where(.swal2-container) {
  z-index: 9000;
}
</style>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
