<template>
<div v-if="isLoading" class="overlay">
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    </div>
    <div class="bg-[#CFF6CF] min-h-screen"> 
            <div class="flex  bg-[#CFF6CF] w-full px-5 py-5 ">
                <div class="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[10px] w-full ">
                    <div class="grid my-5 py-5">
                        <h1 class="text-2xl font-semibold text-center">ข้อมูลสัญญา</h1>
                    </div>
                    <div class="grid">
                        <DataTable
                            :value="list"
                            :paginator="true"
                            :rows="5"
                            :rowsPerPageOptions="[5, 10, 20, 50]"
                            responsiveLayout="stack"
                            selectionMode="single"
                            class="font"
                            currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ">
                            <template #empty>
                                <p class="font-italic text-center text-2xl">No Information Found</p>
                            </template>
           
                            <Column header="ชื่อ"  >
                                <template #body="item">
                                    {{ item?.data?.contractor?.name }}
                                </template>
                            </Column>
                            <Column header="สถานะ">
                                <template #body="item">
                                    {{ lastStatus(item?.data?.status) }}
                                </template>
                            </Column>
                            <Column header="วันที่"  >
                                <template #body="item">
                                    {{ new Date(item?.data?.contract_start)?.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}   - {{ new Date(item?.data?.contract_end)?.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })  }}
                                </template>
                            </Column>
                            <Column header="ดูเซ็นต์สัญญา"  >
                                <template #body="item">
                                    <button  @click=" dialogcontact(item)" class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
                                    focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center " >ดูสัญญา</button>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </div>
    </div>        

    <Dialog v-model:visible="dialog_contact" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" header="ดูรายละเอียดสัญญา" :style="{ width: '950px', 'z-index': 1000 }">
    <div class="max-w-4xl mx-auto bg-white ">
      <div class="grid gap-6 mb-6 ">
        <contactviews :base="contact"  v-if="contact_id !=''"/>
      </div>
      <!-- v-if="lastStatus(contact?.status) =='รอลงนาม'" -->
      <div v-if="lastStatus(contact?.status) =='รอลงนาม'">
        <div class="grid gap-6 mb-6 text-center " >
        <div>
        
          <img v-if="silp_prview !=''" :src="silp_prview" class="w-1/2 mx-auto" />
          <FileUpload
          mode="basic"
          name="demo[]" url="/api/upload"
          chooseLabel="แนบสลิปโอนเงิน"
          :auto="true"
          class="mt-4 font bg-green-700 border-none hover:bg-green-600"
          @uploader="choosesilp"
          :customUpload="true"
          :fileLimit="1"
          v-if="silp ==''"
        />
        <div v-else class="text-2xl text-blue-700">  คุณได้อัพสลิปเงินแล้ว</div>
  </div>
      </div>
  
    <div class="grid gap-6 mb-6 lg:grid-cols-2" >
      
      <div class="flex">
          <div class="flex mx-5">
           
            <Dropdown v-model="signname" :options="optionsign" optionLabel="name" optionValue="_id" placeholder="กรุณาเลือกคนลงนาม"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-1   " />
          
          </div>
          <div class="flex">
            <button   @click="signatureadd()"  class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">+</button>
          </div>
      </div>
      
    </div>

    
    <div class="grid py-3" > 
      <div class="block w-full overflow-x-auto">
        <table  class="items-center w-full bg-transparent border-collapse">
          <thead>
          <tr>
            <th class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">ชื่อ - สกุลที่ลงนามสัญญา</th>
            <th class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">แผนกที่ลงนามสัญญา</th>
            <th class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">ตำแหน่งที่ลงนามสัญญา</th>
            <th class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">ลบ</th>
          </tr>
        </thead>
        <tr v-for="(item, index) in signdata" :key="index">
        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{{ item.name }}</td>
        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{{ item.role }}</td>
        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{{ item.position }}</td>
        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
          <button @click="signaturedelete(item._id)" class="text-white bg-red-500 hover:bg-400 focus:ring-4 focus:outline-none focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">-</button>
        </td>
      </tr>
      <tr v-if="signdata?.length<=0 || signdata == undefined"  class="border">
        <td colspan="4" class="text-center py-5">ไม่มีข้อมูล</td>
      </tr>
       </table>
      </div>
       
    </div>
    <div class="flex justify-center mt-5">
      <button  @click=" showpdpa()"
      class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
      focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2">ลงนามสัญญา</button>
      <button  @click=" editcontact()"
      class="text-white bg-orange-600 hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
      focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2">แก้ไขสัญญา</button>
      <button  @click=" canclecontact()"
      class="text-white bg-red-600 hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
      focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">ยกเลิกลงนามสัญญา</button>
    </div>
    </div>

  
</div>
  </Dialog>
  <Dialog v-model:visible="pdpa" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '950px', 'z-index': 3000 }">
    <div class="max-w-4xl mx-auto bg-white ">
      <div class="grid gap-6  ">
          <img src="../../assets/1.jpg" alt="">
          <img src="../../assets/2.jpg" alt="">
          <img src="../../assets/3.jpg" alt="">
      </div>
    <div class="flex justify-center mt-5">
      <button  @click=" accpetcontact()" 
      class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
      focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2">ลงนามสัญญา</button>
    </div>
</div>
  </Dialog>  
</template>

<script setup>

import { Partner } from "@/service/partner";
import "@/components/loadingStyle.css";
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import  contactviews from "@/components/partner/contact.vue";

const partner = new Partner();
const $stores = useStore();
const $toast = useToast();
const $confirm = useConfirm();
const isLoading = ref(false);
const dialog = ref(false);



const list =ref([]);
const choose = ref(0);
const opendialog = (val) => {
    
    dialog.value = true;
    choose.value = val;
};

onMounted(async () => {
    isLoading.value = true;
    await getItem();
    isLoading.value = false;
    
});
const getItem = async () => {
    isLoading.value = true;
    const res = await partner.GetContract();
    list.value = res.data;
    list.value = list.value.filter(item=> item?.partner?.id == $stores.getters._id);
    await partner.Getbypartnerid($stores.getters._id).then(async (res) => {
        userData.value = res.data;
        optionsign.value = userData.value.signature;

    });
    isLoading.value = false;
};
const userData = ref({});

const lastStatus =(status)=>{
    if (status.length > 0) {
        return status[status.length - 1]?.name;
    } else {
    return "";
    }
}
// ส่วนของการเซ็นต์สัญญา
const dialog_contact = ref(false);
const contact_id = ref('');
const contact = ref({});
const dialogcontact = (item) => {
    contact_id.value = item.data._id;
    contact.value = item.data;
    dialog_contact.value = true;
};

const optionsign = ref([]);
const signname = ref('');
const signatureadd = async (id) => {
    const data = optionsign.value.find((item) => item._id == signname.value);
    console.log(data);
    signdata.value.push(data);
    signname.value = "";
};

const showpdpa = () => {
    pdpa.value = true;
};


const silp = ref('');
const silp_prview = ref('');
const choosesilp = (e) => {
    silp.value = e.files[0];
    silp_prview.value = URL.createObjectURL(e.files[0]);
};
const getImage = (item)=>{
        return `https://drive.google.com/thumbnail?id=${item}`;
}
const accpetcontact = async()=>{
    isLoading.value =true;
    const data ={
      name:"การลงนามสัญญาสำเร็จ"
    }
    await partner.AccpetContract(data,contact_id.value).then(async (res) => {
          if (res.status == true) {
            $toast.add({
                severity: "success",
                summary: "แจ้งเตือน",
                detail: "ลงนามสัญญาสำเร็จ",
                life: 3000,
            });
          }
            
            await getItem();

            pdpa.value = false;
            dialog_contact.value = false;
        })
        isLoading.value = false;
}
const editcontact = async()=>{
      isLoading.value = true;
      const data ={name:"แก้ไขสัญญา"}
        await partner.EditContract(data,contact_id.value).then(async (res) => {
          if (res.status == true) {
            $toast.add({
                severity: "success",
                summary: "แจ้งเตือน",
                detail: "ส่งเรื่องไปให้เรียบร้อยแล้ว",
                life: 3000,
            });
            await getItem();
            dialog_contact.value = false;
          }
        })
        isLoading.value = false;
}
const canclecontact = async()=>{
      isLoading.value =true;
        const data ={ name:"ยกเลิกการลงนามสัญญา"}
        await partner.CancleContract(data,contact_id.value).then(async (res) => {
          if (res.status == true) {
            $toast.add({
                severity: "success",
                summary: "แจ้งเตือน",
                detail: "ยกเลิกสัญญาให้เรียบร้อยแล้ว",
                life: 3000,
            });
            await getItem();
            dialog_contact.value = false;
          }
        })
        isLoading.value = false;
}
const pdpa = ref(false);


document.title = " ข้อมูลสัญญา partner";
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>