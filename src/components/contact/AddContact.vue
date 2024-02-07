<template>
    <div v-if="isLoading" class="overlay">
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    </div>
    <div class="bg-[#CFF6CF] min-h-screen h-full" style="min-height:6200px;">
        <div class="flex  h-screen bg-[#CFF6CF] w-full px-5 py-5 ">
            <!-- Login Container -->
            <div class="min-w-fit flex-col border px-6 py-14 rounded-[10px] w-full">
                <img class="text-center h-50 w-50 py-5" src="../../assets/มีที่ไม่มีทุน.jpg" alt="" @click="opendialog(1)">
                <img class="text-center h-50 w-50 py-5" src="../../assets/มีที่ไม่มีทุน.jpg" alt="" @click="opendialog(2)">
                <img class="text-center h-50 w-50 py-5" src="../../assets/มีที่ไม่มีทุน.jpg" alt="" @click="opendialog(3)">
            </div>
        </div>
    </div>
    <Dialog v-model:visible="dialog" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '950px', 'z-index': 1000 }">
    <template #header>
      <span class="text-green-600 font-bold" style="font-size: 1.25rem; font-weight: 700">อ่านข้อตกลง PDPA</span>
    </template>
        <img src="../../assets/2.jpg" v-if="choose ==1">
        <img src="../../assets/1.jpg" v-if="choose ==2">
        <img src="../../assets/3.jpg" v-if="choose ==3">
        <div class="mt-5 text-center">
            <button  @click=" accpetcontact()" class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2">ยอมรับสัญญา PDPA</button>
            <button @click="dialog = false" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2">ไม่ยอมรับสัญญา PDPA</button>
        </div>
        
    </Dialog>
    
    <Dialog v-model:visible="dialogselect1" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '950px', 'z-index': 1000 }">
    
    </Dialog>
</template>

<script setup>

import { Partner } from "@/service/partner";
import "@/components/loadingStyle.css";
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const partner = new Partner();
const $stores = useStore();
const $toast = useToast();
const $confirm = useConfirm();
const isLoading = ref(false);
const dialog = ref(false);

const choose = ref(0);
const opendialog = (val) => {
    
    dialog.value = true;
    choose.value = val;
};
const dialogselect1 = ref(false);
const accpetcontact = () => {
    dialog.value = false;
    if(choose.value == 1){
        dialogselect1.value = true;
    }
};

</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>