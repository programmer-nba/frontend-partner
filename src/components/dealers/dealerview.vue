<template>
    <div v-if="isLoading" class="overlay">
            <div class="loader">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>
        <div class="bg-[#CFF6CF] "> 
            <div class="flex  bg-[#CFF6CF] w-full px-5 py-5 ">
                <div class="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[10px] w-full ">
                    <div class="grid my-5 py-5">
                        <h1 class="text-2xl font-semibold text-center">ลงทะเบียนคู่ค้า(Dealers)</h1>
                    </div>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                        <div class="">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ชื่อ - นามสกุล</label>
                            <input  v-model="dealer.name"   type="text" placeholder="กรุณากรอกชื่อ - นามสกุล"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   ">
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">เลขที่บัตรประชาชน</label>
                            <input  v-model="dealer.lden"   type="text" placeholder="กรุณากรอกเลขที่บัตรประชาชน"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   "> 
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">เบอร์โทรศัพท์</label>
                            <input  v-model="dealer.phone"   type="text" placeholder="กรุณากรอกเบอร์โทรศัพท์"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   ">
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ที่อยู่</label>
                            <input  v-model="dealer.address"   type="text" placeholder="กรุณากรอกที่อยู่"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   ">
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">จังหวัด</label>
                            <Dropdown v-model="dealer.province" :options="optionprovince" optionLabel="name_th" optionValue="name_th"
                                placeholder="กรุณาเลือกจังหวัด" filter @change="chooseprovice()"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
                         </div>
                         <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">อำเภอ</label>
                            <!-- // ตรงนี้เป็น dropdown ที่เราเลือกจังหวัดแล้วไปเรียกอำเภอ -->
                            <Dropdown v-model="dealer.amphure" :options="optionamphure" optionLabel="name_th" optionValue="name_th"
                                placeholder="กรุณาเลือกอำเภอ" filter @change="chooseamphure()"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
                            
                         </div>
                         <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ตำบล</label>
                            <!-- // ตรงนี้เป็น dropdown ที่เราเลือกอำเภอแล้วไปเรียกตำบล -->
                            <Dropdown v-model="dealer.district" :options="optiondistrict" optionLabel="name_th" optionValue="name_th"
                                placeholder="กรุณาเลือกตำบล" filter @change="choosedistrict()"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
                          </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสไปรษณีย์</label>
                                <input  v-model="dealer.postcode"   type="text" placeholder="กรุณากรอกรหัสไปรษณีย์" readonly="true"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   ">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ชื่อบริษัท</label>
                                <input  v-model="dealer.company_name"   type="text" placeholder="กรุณากรอกชื่อบริษัท"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   ">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">เลขที่ผู้เสียภาษี</label>
                                <input  v-model="dealer.company_tax"   type="text" placeholder="กรุณากรอกเลขที่ผู้เสียภาษี"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3   ">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ที่อยู่บริษัท</label>
                                <input  v-model="dealer.company_address"   type="text" placeholder="กรุณากรอกที่อยู่บริษัท"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">จังหวัด</label>
                                <Dropdown v-model="dealer.company_province" :options="optionprovince" optionLabel="name_th" optionValue="name_th"
                                    placeholder="กรุณาเลือกจังหวัด" filter @change="chooseprovicecompany()"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">อำเภอ</label>
                                <Dropdown v-model="dealer.company_amphure" :options="optionamphurecompany" optionLabel="name_th" optionValue="name_th"
                                    placeholder="กรุณาเลือกอำเภอ" filter @change="chooseamphurecompany()"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ตำบล</label>
                                <Dropdown v-model="dealer.company_district" :options="optiondistrictcompany" optionLabel="name_th" optionValue="name_th"
                                    placeholder="กรุณาเลือกตำบล" filter @change="choosedistrictcompany()"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  " />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">รหัสไปรษณีย์</label>
                                <input  v-model="dealer.company_postcode"   type="text" placeholder="กรุณากรอกรหัสไปรษณีย์"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">เบอร์โทรศัพท์บริษัท</label>
                                <input  v-model="dealer.company_phone"   type="text" placeholder="กรุณากรอกเบอร์โทรศัพท์บริษัท"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ชื่อบัญชี</label>
                                <input  v-model="dealer.bookbank_name"   type="text" placeholder="กรุณากรอกชื่อบัญชี"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">เลขที่บัญชี</label>
                                <input  v-model="dealer.bookbank_number"   type="text" placeholder="กรุณากรอกเลขที่บัญชี"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                
                            </div>
                    </div>
                    <div class="grid gap-6 mb-6 lg:grid-cols-2">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">แนบไฟล์เลขที่บัตรประชาชน</label>
                            <img class=" bg-white p-2 shadow mb-4" :src="getImage(dealer.lden_file_prview)" v-if="dealer.lden_file_prview !='' && dealer.lden_file_chooes ==''">
                            <img class=" bg-white p-2 shadow mb-4" :src="dealer.lden_file_chooes" v-if="dealer.lden_file_chooes !=''">
                            <FileUpload
                                mode="basic"
                                name="demo[]" url="/api/upload"
                                chooseLabel="เลือกไฟล์ภาพบัตรประชาชน"
                                :auto="true"
                                class="mt-4 font bg-green-700 border-none hover:bg-green-600"
                                @uploader="chooseIdCard"
                                :customUpload="true"
                                :fileLimit="1"
                                v-if="dealer.lden_file ==''"
                            />

                            
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">แนบไฟล์เลขที่บัญชี</label>
                            <img class=" bg-white p-2 shadow mb-4" :src="dealer.bookbank_file_choose" v-if="dealer.bookbank_file_choose !=''">
                            <FileUpload
                                mode="basic"
                                name="demo[]" url="/api/upload"
                                chooseLabel="เลือกไฟล์ภาพบัญชี"
                                :auto="true"
                                class="mt-4 font bg-green-700 border-none hover:bg-green-600"
                                @uploader="chooseBookBank"
                                :customUpload="true"
                                :fileLimit="1"
                                v-if="dealer.bookbank_file ==''"
                            />

                        </div>
                    </div>
                    <div class="flex justify-center my-5">
                        <button  @click="registerDealer()" class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
                        focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2">ลงทะเบียนคู่ค้า</button>
                    </div>
                </div>
            
            </div>
                
        </div>
    
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

    document.title = "ลงทะเบียนคู่ค้า | SmartPro";

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
        lden_file_prview:"",
        lden_file_chooes:"",

        bookbank_file:"",
        bookbank_file_choose:"",
        // ผูกกับ partner_id
    });

    const optionprovince = ref([]);
    const optionamphure = ref([]);
    const optiondistrict = ref([]);

    //ของบริษัท
    const optionamphurecompany = ref([]);
    const optiondistrictcompany = ref([]);

    onMounted(async () => {
        await getProvince();
    });
    const getProvince = async () => {
        const res = await partner.GetProvince();
        optionprovince.value = res;
  
    };
    
    const registerDealer = async () => {
        isLoading.value = true;
        try {

            const formData = new FormData();
            formData.append("name", dealer.value.name);
            formData.append("lden", dealer.value.lden);
            formData.append("phone", dealer.value.phone);
            formData.append("address", dealer.value.address);
            formData.append("province", dealer.value.province);
            formData.append("amphure", dealer.value.amphure);
            formData.append("district", dealer.value.district);
            formData.append("postcode", dealer.value.postcode);
            formData.append("company_name", dealer.value.company_name);
            formData.append("company_tax", dealer.value.company_tax);
            formData.append("company_address", dealer.value.company_address);
            formData.append("company_province", dealer.value.company_province);
            formData.append("company_amphure", dealer.value.company_amphure);
            formData.append("company_district", dealer.value.company_district);
            formData.append("company_postcode", dealer.value.company_postcode);
            formData.append("company_phone", dealer.value.company_phone);
            formData.append("bookbank_name", dealer.value.bookbank_name);
            formData.append("bookbank_number", dealer.value.bookbank_number);
            formData.append("lden_file", dealer.value.lden_file);
            formData.append("bookbank_file", dealer.value.bookbank_file);

            const res = await partner.registerDealer(dealer.value);
            if (res.status === 200) {
                $toast.add({
                    severity: "success",
                    summary: "ลงทะเบียนคู่ค้าสำเร็จ",
                    detail: "ลงทะเบียนคู่ค้าสำเร็จ",
                    life: 3000,
                });
                dealer.value = {
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
                    lden_file:"",
                    bookbank_file:"",
                };
            }
        } catch (error) {
            $toast.add({
                severity: "error",
                summary: "ลงทะเบียนคู่ค้าไม่สำเร็จ",
                detail: "ลงทะเบียนคู่ค้าไม่สำเร็จ",
                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    };
    ///
    const chooseprovice = async () => {
        const province = optionprovince.value.find((item) => {
            return item.name_th == dealer.value.province;
        });
        await partner.GetAmphure(province.id).then(async (res) => {
            optionamphure.value = res;
        });
    };

    const chooseamphure = () => {
        const amphure = optionamphure.value.find((item) => {
            return item.name_th == dealer.value.amphure;
        });
        partner.GetTambon(amphure.id).then(async (res) => {
            optiondistrict.value = res;
        });
    };

    const choosedistrict = () => {
        const district = optiondistrict.value.find((item) => {
            return item.name_th == dealer.value.district;
        });

        dealer.value.postcode = district?.zip_code;
    };
    ///
    const chooseprovicecompany = async () => {
        const province = optionprovince.value.find((item) => {
            return item.name_th == dealer.value.company_province;
        });
        await partner.GetAmphure(province.id).then(async (res) => {
            optionamphurecompany.value = res;
        });
    };
    //เมื่อเลือกอำเภอ แล้วไปเรียกตำบล
    const chooseamphurecompany = () => {
        const amphure = optionamphurecompany.value.find((item) => {
            return item.name_th == dealer.value.company_amphure;
        });
        partner.GetTambon(amphure.id).then(async (res) => {
            optiondistrictcompany.value = res;
        });
    };
    //เมื่อเลือกตำบล แล้วไปเรียกรหัสไปรษณีย์
    const choosedistrictcompany = () => {
        const district = optiondistrictcompany.value.find((item) => {
            return item.name_th == dealer.value.company_district;
        });

        dealer.value.company_postcode = district?.zip_code;
    };

    const getImage =(item)=>{
        return `https://drive.google.com/thumbnail?id=${item}`;
    }

    const chooseIdCard = (e) => {
        dealer.value.lden_file = e.files[0];
        dealer.value.lden_file_chooes = URL.createObjectURL(e.files[0]);
    };
    const chooseBookBank = (e) => {
        dealer.value.bookbank_file = e.files[0];
        dealer.value.bookbank_file_choose = URL.createObjectURL(e.files[0]);
    };

    document.title = "ลงทะเบียนคู่ค้า partner";


    </script>
    
    <style scoped>
    @import "tailwindcss/base";
    @import "tailwindcss/components";
    @import "tailwindcss/utilities";
    </style>