<template>
    <div v-if="isLoading" class="overlay">
            <div class="loader">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>
        <div class="bg-[#CFF6CF]  min-h-screen"> 
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
               
                                <Column header="ชื่อ - นามสกุล"  >
                                    <template #body="item">
                                        {{ item?.data?.name }}
                                    </template>
                                </Column>
                                <Column header="บริษัท"  >
                                    <template #body="item">
                                        {{ item?.data?.company_name }}
                                    </template> 
                                </Column>
                                <Column header="สถานะ">
                                    <template #body="item">
                                        {{ lastStatus(item?.data?.status) }}
                                    </template>
                                </Column>
                                <Column header="ดูรายละเอียด" >
                                    <template #body="item">
                                        <button  @click=" dialogcontact(item)" class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
                                        focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">ดูรายละเอียด</button>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
        </div>        
    
        <!-- dialog แสดงรายละเอียด ข้อมูล คู่ค้า ตามตัวแปร dealer -->
        <Dialog v-model:visible="dialog" header="แสดงรายละเอียดข้อมูลคู่ค้า" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '950px', 'z-index': 1000 }">
           
            <div class="flex flex-col bg-white p-5">
                <div class="grid gap-6 mb-6 lg:grid-cols-2 mt-5">
                    <div class="">
                        <h1 class="text-lg font-semibold">ชื่อ - นามสกุล</h1>
                        <p class="text-lg">{{ dealer.name }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">เลขที่บัตรประชาชน</h1>
                        <p class="text-lg">{{ dealer.lden }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">เบอร์โทรศัพท์</h1>
                        <p class="text-lg">{{ dealer.phone }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">ที่อยู่</h1>
                        <p class="text-lg">{{ dealer.address }} ตำบล{{ dealer.district }} อำเภอ{{ dealer.amphure }} จังหวัด{{ dealer.province }} {{ dealer.postcode }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">ชื่อบริษัท</h1>
                        <p class="text-lg">{{ dealer.company_name }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">เลขที่ผู้เสียภาษี</h1>
                        <p class="text-lg">{{ dealer.company_tax }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">ที่อยู่บริษัท</h1>
                        <p class="text-lg">{{ dealer.company_address }} ตำบล{{ dealer.company_district }} อำเภอ{{ dealer.company_amphure }} จังหวัด{{ dealer.company_province }} {{ dealer.company_postcode }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">เบอร์โทรศัพท์บริษัท</h1>
                        <p class="text-lg">{{ dealer.company_phone }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">ชื่อธนาคาร</h1>
                        <p class="text-lg">{{ dealer.bookbank_name }}</p>
                    </div>
                    <div class="">
                        <h1 class="text-lg font-semibold">เลขที่บัญชี</h1>
                        <p class="text-lg">{{ dealer.bookbank_number }}</p>
                    </div>
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

    const partner = new Partner();
    const $stores = useStore();
    const $toast = useToast();
    const $confirm = useConfirm();
    const isLoading = ref(false);
    const dialog = ref(false);
    
    const list =ref([{
        name: "ณัฏฐนนท์ ศรสุวรรณ",
        lden: "1509963050356",
        phone: "0910798390",
        address:"79 หมู่ 1",
        province:"เชียงใหม่",
        amphure:"เมืองเชียงใหม่" ,
        district:"สุเทพ",
        postcode :"50200",
        company_name:"บริษัท บุญรอด จำกัด",
        company_tax:"151024005410",
        company_address:"79 หมู่ 1",
        company_province:"เชียงใหม่",
        company_amphure:"เมืองเชียงใหม่",
        company_district:"สุเทพ",
        company_postcode:"50200",
        company_phone:"0651245050",
        status:[{
            name:"รอการอนุมัติ",
            date:"2021-10-10"
        }],
        bookbank_name:"กสิกรไทย",
        bookbank_number:"350561201", 
        lden_file:"",
        bookbank_file:"",
    }]);



    onMounted(async () => {
        isLoading.value = true;
        await getItem();
        isLoading.value = false;
        
    });
    const getItem = async () => {
        isLoading.value = true;
        // const res = await partner.GetContract();
        // list.value = res.data;
        isLoading.value = false;
    };
    
    const lastStatus =(status)=>{
        if (status?.length > 0) {
            return status[status?.length - 1]?.name;
        } else {
        return "";
        }
    }
    const dealer = ref({
        name: "",
        lden: "",
        phone: "",
        address:"",
        province:"",
        amphure:"" ,
        district:"",
        postcode :"",
        company_name:"",
        company_tax:"",
        company_address:"",
        company_province:"",
        company_amphure:"",
        company_district:"",
        company_postcode:"",
        company_phone:"",

        bookbank_name:"",
        bookbank_number:"",  
        //ไฟล์
        lden_file:"",
        bookbank_file:"",
        // ผูกกับ partner_id
    });

    const dialogcontact = (item) => {
        dialog.value = true;
        dealer.value = item.data;
    };
    document.title = "คู่ค้า partner";
</script>
    
<style scoped>
    @import "tailwindcss/base";
    @import "tailwindcss/components";
    @import "tailwindcss/utilities";
</style>