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
        ทำที่ ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด <br>
        หนังสือสัญญา อิเล็กทรอนิกส์ ฉบับนี้จัดทำขึ้น ณ ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด ณ วันที่ {{ new Date().toLocaleString() }} กับผู้ทำสัญญา .....partner_name..... ซึ่งบริษัทตระหนักดีถึงสิทธิในความเป็นส่วนตัวและความรับผิดชอบของบริษัทฯ เกี่ยวกับการเก็บรวบรวม การใช้ การเปิดเผย (“ประมวลผล”หรือ“การประมวลผล”) ข้อมูลส่วนบุคคลของท่าน บริษัทฯ จึงได้จัดทำนโยบายการคุ้มครองข้อมูลส่วนบุคคลฉบับนี้ขึ้นมาเพื่อแจ้งรายละเอียดเกี่ยวกับการประมวลผลข้อมูลส่วนบุคคลของท่าน รวมถึงรายละเอียดเกี่ยวกับระยะเวลาในการเก็บรักษาข้อมูลส่วนบุคคล การเปิดเผยข้อมูลส่วนบุคคล สิทธิของเจ้าของข้อมูลส่วนบุคคลและวิธีการติดต่อบริษัท ตามที่กำหนดไว้ในพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 คู่สัญญาได้ตกลงกันมีข้อความดังต่อไปนี้
        <br>
1. วัตถุประสงค์
<br>
1.1 เพื่อแจ้งรายละเอียดเกี่ยวกับการประมวลผลข้อมูลส่วนบุคคลการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลตามตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
<br>
1.2 เพื่อป้องกันการนำข้อมูลส่วนบุคคลของเจ้าของข้อมูลส่วนบุคคลหรือบุคคลที่ติดต่อบริษัทในรูปแบบเอกสาร และรูปแบบอิเล็กทรอนิกส์ ไปใช้ในทางที่มิชอบ หรือมีการล่วงละเมิดสิทธิความเป็นส่วนตัวของข้อมูลส่วนบุคคล ก่อให้เกิดความเสียหายให้แก่เจ้าของข้อมูลส่วนบุคคล บริษัทฯ ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด จึงจำกัดสิทธิการเข้าถึงข้อมูลส่วนบุคคล เฉพาะบุคคลที่ได้รับมอบหมายและได้รับการอนุมัติเท่านั้น โดยจะเก็บรวบรวม ใช้ เปิดเผย ข้อมูลส่วนบุคคลดังกล่าว เพื่อคุ้มครองข้อมูลส่วนบุคคลของเจ้าของข้อมูลส่วนบุคคลและบุคคลที่ติดต่อบริษัทฯ ในรูปแบบเอกสารและรูปแบบข้อมูลอิเล็กทรอนิกส์ตามที่กฎหมายกำหนดไว้
<br>
1.3 เพื่อรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลมิให้ข้อมูลรั่วไหลและป้องกันการนำข้อมูลดังกล่าว ไปใช้โดยมีเจตนาที่ไม่สุจริตหรือโดยไม่ได้รับอนุญาต ซึ่งเป็นไปตามนโยบายรักษาความมั่นคงปลอดภัยด้านเทคโนโลยีสารสนเทศของบริษัทฯ
<br>
2. ขอบเขตของนโยบายฉบับนี้
<br>
2.1 นโยบายฉบับนี้ใช้กับลูกค้า ผู้มุ่งหวังหรือผู้ใช้บริการบนเว็บไซต์
<br>
2.2 นโยบายฉบับนี้ใช้บังคับกับข้อมูลส่วนบุคคลของบุคคลซึ่งมีความสัมพันธ์กับบริษัทฯ ในปัจจุบันและที่อาจมีในอนาคต ซึ่งถูกประมวลผลข้อมูลโดยบริษัทฯ พนักงาน ลูกจ้างตามสัญญาจ้าง ตัวแทน คู่ค้า ผู้ให้บริการของบริษัทฯ รวมถึงคู่สัญญาหรือบุคคลภายนอกที่ประมวลผลข้อมูลส่วนบุคคลแทนหรือในนามของบริษัทฯ ภายใต้ผลิตภัณฑ์และบริการต่างๆ ที่อยู่ในความควบคุมดูแลของบริษัทฯ
<br>
2.3 นโยบายการคุ้มครองข้อมูลส่วนบุคคลฉบับนี้ ได้รับการอนุมัติจากคณะกรรมการบริษัทฯ คำนิยาม
<br>
3. ข้อมูลส่วนบุคคล

หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ ไม่ว่าทางตรง หรือทางอ้อม แต่ไม่รวมถึง ข้อมูลของผู้ถึงแก่กรรมโดยเฉพาะ

<br>
4. ข้อมูลส่วนบุคคลที่มีความอ่อนไหว

หมายถึง ข้อมูลตามที่กำหนดไว้ในมาตรา 26 พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคลและฉบับปรับปรุงแก้ไขตามที่จะมีการแก้ไขเป็นคราวๆ กฎหมายและกฎระเบียบที่ใช้บังคับอื่น รวมถึงข้อมูลบุคคลเกี่ยวกับเชื้อชาติ เผ่าพันธุ์ ความคิดเห็นทางการเมือง ศาสนาหรือปรัชญา พฤติกรรมทางเพศ ประวัติอาชญากรรม ข้อมูลสุขภาพ ความพิการ ข้อมูลสหภาพแรงงาน ข้อมูลพันธุกรรม ข้อมูลชีวภาพ หรือข้อมูลอื่นใดซึ่งกระทบต่อเจ้าของข้อมูลส่วนบุคคลในทำนองเดียวกัน
<br>

5. พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล

หมายถึง พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 รวมถึงกฎหมายลำดับรองที่อาศัยอำนาจ พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล ในการตราขึ้น และตามที่มีการแก้ไขเป็นครั้งคราว
<br>

6. การประมวลผล

หมายถึง การดำเนินการใดๆกับข้อมูลส่วนบุคคล เช่น การเก็บรวบรวม บันทึก ทำสำเนา จัดระบบ ทำโครงสร้าง เก็บรักษา ปรับปรุง เปลี่ยนแปลง กู้คืน ใช้ เปิดเผย ส่งต่อ เผยแพร่ โอน ผสมเข้าด้วยกัน ลบ ทำลาย โดยประการใดประการหนึ่งหรือหลายประการประกอบกัน

<br>
7. เจ้าของข้อมูลส่วนบุคคล

หมายถึง บุคคลธรรมดาซึ่งเป็นเจ้าของข้อมูลส่วนบุคคลที่บริษัทฯ ประมวลผล
<br>

8. ผู้ควบคุมข้อมูลส่วนบุคคล

หมายถึง บุคคลหรือนิติบุคคลซึ่งมีอำนาจหน้าที่ตัดสินใจเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล
<br>

9. ผู้ประมวลผลข้อมูลส่วนบุคคล

หมายถึง บุคคลหรือนิติบุคคลซึ่งดำเนินการเกี่ยวกับการเก็บรวบรวม ใช้ หรือ เปิดเผยข้อมูลส่วนบุคคลตามคำสั่ง หรือในนามของผู้ควบคุมข้อมูลส่วนบุคคล
<br>

10. บริษัท

หมายถึง บริษัท ทศกัณฐ์ ดิจิตอล นิว เจนเนอเรชั่นจำกัด
<br>

11. รูปแบบเอกสาร

หมายถึง กระดาษหรือวัตถุอื่นใดซึ่งได้ทำให้ปรากฏความหมาย ด้วยตัวอักษร ตัวเลข ผัง หรือแผนแบบอย่างอื่น จะเป็นโดยวิธีพิมพ์ถ่ายภาพ หรือวิธีอื่น อันเป็นหลักฐานแห่งความหมายนั้น
<br>

12. รูปแบบข้อมูลอิเล็กทรอนิกส์

หมายความว่า ข้อความที่ได้สร้าง ส่ง รับ เก็บรักษา หรือประมวลผลด้วยวิธีการทางอิเล็กทรอนิกส์ เช่น วิธีการแลกเปลี่ยนข้อมูลทางอิเล็กทรอนิกส์ จดหมายอิเล็กทรอนิกส์ โทรเลข โทรพิมพ์ หรือโทรสาร ข้อมูลส่วนบุคคลที่เก็บรวบรวม
<br>

13. บริษัทฯ จะประมวลผลข้อมูลส่วนบุคคล ซึ่งอาจรวมถึงข้อมูลส่วนบุคคลที่มีความอ่อนไหวของท่าน ดังต่อไปนี้
<br>
13.1ข้อมูลส่วนบุคคลทั่วไป
<br>
13.1.1 ข้อมูลส่วนบุคคลที่เกี่ยวกับท่านเป็นการทั่วไป เช่น ชื่อ-นามสกุล เลขบัตรประจำตัวประชาชน วันเกิด อายุ อาชีพ เพศ สถานภาพทางการสมรส รูปถ่าย หมายเลขโทรศัพท์บ้าน ที่อยู่ปัจจุบัน หมายเลขโทรศัพท์เคลื่อนที่ ที่อยู่ตามทะเบียนบ้าน ที่อยู่เพื่อจัดส่งไปรษณีย์ ข้อมูลเกี่ยวกับหลักฐานแสดงตัวตน เช่น เลขที่บัตรประจำตัวประชาชน เลขที่หนังสือเดินทาง เลขที่บัตรคนต่างด้าว วันหมดอายุ ประเทศที่ออกหนังสือเดินทาง อีเมล เสียงการสนทนาไม่ว่าจะถูกบันทึกในรูปแบบใด และรายละเอียดข้อมูลติดต่ออื่นๆ
<br>
13.1.2 ข้อมูลเกี่ยวกับการทำงานของท่าน เช่น ตำแหน่งงาน สถานที่ทำงาน ประวัติเกี่ยวกับการทำงานของท่าน ซึ่งอาจรวมถึงชื่อและที่อยู่ของนายจ้างของท่าน
<br>
13.1.3 ข้อมูลทางการเงิน เช่น รายได้ แหล่งที่มาของรายได้ เลขบัญชีธนาคาร ข้อมูลเกี่ยวกับภาษี รายละเอียดเกี่ยวกับการเคลื่อนไหวของบัญชีธนาคาร รายละเอียดเกี่ยวกับเงินกู้ ข้อมูลเกี่ยวกับการลงทุน รายละเอียดเกี่ยวกับบัตรเครดิต และรายละเอียดหรือข้อมูลเกี่ยวกับการชำระเงินอื่นๆ
<br>
13.1.4 รายละเอียดผลิตภัณฑ์และ/หรือบริการต่างๆ ได้แก่ รายละเอียดผลิตภัณฑ์และ/หรือบริการต่างๆ ที่ท่านเคยซื้อจากบริษัทฯ รวมถึงการใช้สิทธิต่างๆ ผลิตภัณฑ์ หรือบริการอื่นๆ ของบริษัทฯ
<br>
13.1.5 สถานะทางกฎหมาย เช่น สถานะเกี่ยวกับการฟอกเงิน สถานะเกี่ยวกับการสนับสนุนเงินแก่การก่อการร้าย ภาวะล้มละลาย สถานะตามกฎหมายสหรัฐอเมริกาว่าด้วยการป้องกันมิให้บุคคลธรรมดาและนิติบุคคลที่มีสถานะเป็นบุคคลอเมริกันหลีกเลี่ยงภาษี (Foreign Account Tax Compliance Act: FATCA)
<br>
13.1.6 ข้อมูลทางเทคนิค และกิจกรรมส่วนบุคคล/ลักษณะการใช้งานที่ท่านชอบ เมื่อท่านใช้เว็บไซต์แอปพลิเคชันของบริษัท และอาจรวมถึงแพลตฟอร์มสื่อสังคมออนไลน์ของ ผู้ให้บริการอื่น เช่น ชื่อเรียกตัวตนเฉพาะของลูกค้าที่ใช้บนแพลตฟอร์มสื่อสังคมออนไลน์ IP Address คุกกี้ (Cookies) ประเภทและเวอร์ชั่นของเบราว์เซอร์ การตั้งค่าเขตเวลา ประเภทของปลั๊กอินในเบราว์เซอร์ ระบบปฏิบัติการและแพลตฟอร์ม ข้อมูลผู้ใช้ (User Profile) ข้อมูลเกี่ยวกับอุปกรณ์ ซึ่งรวมถึงข้อมูลเกี่ยวกับอุปกรณ์เคลื่อนที่ ข้อมูลเครือข่ายไร้สายและข้อมูลครือข่ายทั่วไป
<br>
13.2 ข้อมูลส่วนบุคคลที่มีความอ่อนไหว

บริษัทฯ จัดเก็บรวบรวมข้อมูลส่วนบุคคลที่มีความอ่อนไหว (Sensitive Personal Data) เฉพาะเท่าที่จำเป็น และจะดำเนินการแจ้งรายละเอียดที่เกี่ยวข้อง พร้อมขอและได้รับความยินยอมโดยชัดแจ้ง จากเจ้าของข้อมูลส่วนบุคคลแล้วเท่านั้น เว้นแต่กฎหมายจะกำหนดเป็นข้อยกเว้นไว้เป็นการเฉพาะ
<br>
13.2.1 ข้อมูลด้านสุขภาพและข้อมูลทางการแพทย์ของท่าน เช่น ประวัติการรักษาพยาบาล ประวัติการขอคำปรึกษา บันทึกการตรวจทางการแพทย์ บันทึกการสืบสวนทางการแพทย์ บันทึกของพยาบาล ประวัติการสั่งจ่ายยา บันทึกการรักษา รายละเอียดการบริการทางการแพทย์ที่ได้รับ รายงานทางการแพทย์ รายงานการชันสูตรพลิกศพ และรายละเอียดค่าใช้จ่ายทางการแพทย์ รวมไปถึงคำถามเกี่ยวกับสุขภาพ และข้อมูลหรือสิ่งใด ๆ ที่แสดงออกมาในรูปเอกสาร แฟ้ม รายงาน หนังสือ แผนผัง แผนที่ ภาพวาด ภาพถ่าย ฟิล์ม การบันทึกภาพหรือเสียงการบันทึกโดยเครื่องมือทางอิเล็กทรอนิกส์ หรือสิ่งอื่นใดที่ทำให้สิ่งที่บันทึกไว้ปรากฏขึ้นในเรื่องที่เกี่ยวกับสุขภาพของบุคคลที่สามารถระบุตัวบุคคลได้ ตลอดจนข้อมูลอื่นๆ ตามที่หน่วยงานที่มีอำนาจเกี่ยวกับการคุ้มครองและจัดการข้อมูลด้านสุขภาพของบุคคลประกาศกำหนด
<br>
13.2.2ข้อมูลเกี่ยวประวัติการถูกดำเนินคดีความของท่าน เช่น ประวัติอาชญากรรม บันทึกเกี่ยวกับการดำเนินคดีไม่ว่าทางแพ่ง หรือการดำเนินคดีอื่นๆ รวมไปถึงรายงานของตำรวจ และคำสั่งศาลที่เกี่ยวข้องเท่าที่จำเป็นข้อมูลส่วนบุคคลดังกล่าวข้างต้น
<br>
14. แหล่งที่มาของข้อมูลส่วนบุคคลที่เก็บรวบรวม

ไม่จำกัดเพียงการได้รับข้อมูลจากการตรวจสอบจากแหล่งข้อมูลที่เป็นสาธารณะ แหล่งข้อมูลส่วนตัว หรือแหล่งข้อมูลเชิงพาณิชย์ เว็บไซต์ แหล่งข้อมูลสื่อสังคมออนไลน์ ผู้ให้บริการข้อมูล (Data Providers) แหล่งข้อมูลทางการแพทย์ สถานบริการสาธารณสุข โรงพยาบาล แพทย์ บุคลากรผู้ประกอบวิชาชีพสาธารณสุขอื่น สมาคมหรือสมาพันธ์ของธุรกิจที่เกี่ยวข้องกับผลิตภัณฑ์ที่ท่านซื้อหรือบริการที่ท่านใช้ รวมทั้งเมื่อบริษัทฯ ได้รับข้อมูลส่วนบุคคลจากบุคคลภายนอกเกี่ยวกับท่านเพื่อวัตถุประสงค์ในการปฏิบัติตามกฎหมายและเพื่อวัตถุประสงค์เกี่ยวกับการกำกับดูแลในประการอื่นๆ ตลอดจนเพื่อวัตถุประสงค์อื่นๆที่ชอบด้วยกฎหมาย
<br>

15. วัตถุประสงค์ของการประมวลผลข้อมูลส่วนบุคคล

บริษัทฯ ดำเนินการเก็บรวบรวม ใช้ และเปิดเผย ส่งหรือโอน ข้อมูลส่วนบุคคลของเจ้าของข้อมูลส่วนบุคคล เพื่อวัตถุประสงค์ดังต่อไปนี้
<br>
15.1 เพื่อดำเนินการเกี่ยวกับการเข้าทำสัญญา
<br>
15.2 เพื่อดำเนินการตามความจำเป็นเพื่อประโยชน์โดยชอบด้วยกฎหมายของบริษัทฯ
<br>
15.3 เพื่อการปฏิบัติตามกฎหมาย เช่น การดำเนินการใดๆ ดังนี้
<br>
15.4 เพื่อการปฏิบัติตามกฎหมาย หรือการตรวจสอบธุรกิจของบริษัทฯ ไม่ว่าจะเป็นการตรวจสอบภายใน หรือ การตรวจสอบจากบุคคลภายนอก
<br>
15.5 เพื่อดำเนินการให้เป็นไปตามข้อกำหนดของกฎหมาย กฎ ระเบียบ ข้อตกลง หรือนโยบายที่ใช้บังคับ ซึ่งกำหนดขึ้นโดยหน่วยงานกำกับดูแลของรัฐ หน่วยงานที่มีหน้าที่บังคับใช้กฎหมาย หน่วยงานรัฐ หน่วยงานที่มีหน้าที่ระงับข้อพิพาท ไม่ว่าหน่วยงานใดก็ตาม
<br>
15.6 เพื่อวัตถุประสงค์ของการบังคับใช้กฎหมาย หรือการให้ความช่วยเหลือ ให้ความร่วมมือ การสืบสวนโดยบริษัทฯ หรือในนามของบริษัทฯ โดยเจ้าหน้าที่ตำรวจ หรือโดยหน่วยงานรัฐหรือหน่วยงานกำกับดูแลอื่นๆ ในประเทศ และการดำเนินการตามหน้าที่ในการรายงาน และข้อกำหนดต่างๆ ตามที่กฎหมายกำหนด หรือตามที่มีการตกลงเห็นชอบกับหน่วยงานรัฐหรือหน่วยงานกำกับดูแลอื่นๆ ในประเทศหรือเขตการปกครองใดๆ หรือการดำเนินการตามคำสั่งโดยชอบด้วยกฎหมายของพนักงานเจ้าหน้าที่ หรือหน่วยงานของรัฐ
<br>
15.7 เพื่อการดำเนินการอื่นๆ ที่จำเป็น ซึ่งเกี่ยวข้องกับวัตถุประสงค์ใดๆข้างต้น เว้นแต่กฎหมายและกฎระเบียบที่ใช้บังคับ รวมถึง พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล จะอนุญาตให้กระทำเป็นอย่างอื่น บริษัทฯ จะแจ้งและขอความยินยอมจากท่าน หากบริษัทฯ ประสงค์จะใช้ข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์อื่นใดนอกเหนือไปจากที่ระบุไว้ในนโยบายการคุ้มครองข้อมูลส่วนบุคคลฉบับนี้ หรือนอกเหนือไปจากวัตถุประสงค์ที่เกี่ยวข้องโดยตรงกับนโยบายการคุ้มครองข้อมูลส่วนบุคคลนี้
<br>
16. การเปิดเผยข้อมูลส่วนบุคคล

การดำเนินการตามวัตถุประสงค์ต่างๆ ข้างต้น บริษัทฯ อาจเปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่บุคคลต่าง ๆ ตามที่ระบุด้านล่างนี้ โดยบริษัทฯ จะดำเนินการใดๆ ที่จำเป็นเพื่อคุ้มครองข้อมูลส่วนบุคคลของท่านตามพ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล บุคคลที่เป็นคู่ค้า พันธมิตรของบริษัทฯ หรือบุคคลภายนอกที่มีความเกี่ยวข้องกับผลิตภัณฑ์ที่มีการเสนอขายให้แก่ท่าน หรือผลิตภัณฑ์ที่ท่านอาจสนใจ
<br>

17. การโอนข้อมูลไปยังต่างประเทศ

ข้อมูลส่วนบุคคลของท่านอาจถูกโอนไป ถูกจัดเก็บไว้ หรือประมวลผลโดยบริษัทฯ หรืออาจถูกส่งให้แก่บุคคลหรือหน่วยงานใดๆ ตามรายละเอียดข้างต้น ซึ่งอาจมีที่ตั้งหรืออาจให้บริการอยู่ในประเทศไทยหรือนอกประเทศไทย ทั้งนี้ ข้อมูลส่วนบุคคลของท่าน จะถูกโอนไปยังสถานที่อื่นๆ ตามเงื่อนไขเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล ดังที่ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคลกำหนด โดยหากเป็นการโอนข้อมูลส่วนบุคคลของท่านระหว่างกลุ่มบริษัท บริษัทฯ จะดำเนินการตามนโยบายคุ้มครองข้อมูลส่วนบุคคลภายในกลุ่มบริษัทฯ (Binding Corporate Rules) ที่ได้รับการอนุมัติจากคณะกรรมการ (หากมี)
<br>

18. การเก็บรักษาข้อมูลส่วนบุคคล

บริษัทฯ จะเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้ ตราบเท่าที่จำเป็นต้องเก็บเพื่อการดำเนินการให้บรรลุตามวัตถุประสงค์ในการประมวลผลข้อมูลส่วนบุคคลของท่านตามที่ระบุข้างต้น ทั้งนี้บริษัทฯ จะเก็บรักษา ข้อมูลส่วนบุคคลของท่านไม่เกิน 10 ปี นับแต่วันที่ท่านสิ้นสุดความสัมพันธ์ หรือการติดต่อครั้งสุดท้ายกับบริษัทฯ บริษัทฯ อาจเก็บรักษาข้อมูลส่วนบุคคลของท่านนานกว่าที่กำหนด หากกฎหมายอนุญาตหรือกำหนดไว้เป็นหน้าที่ของบริษัทฯ บริษัทฯ จะมีการดำเนินการตามขั้นตอนที่เหมาะสม เพื่อทำการลบหรือทำลาย หรือทำให้ข้อมูลส่วนบุคคลของท่านเป็นข้อมูลที่ไม่สามารถระบุตัวท่าน ตามระยะเวลาเก็บรักษาข้อมูลส่วนบุคคลข้างต้น
<br>

19. การใช้ข้อมูลส่วนบุคคลตามวัตถุประสงค์เดิม

บริษัทฯ มีสิทธิในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่านที่บริษัทฯ ได้เก็บรวบรวมไว้ก่อนวันที่ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคลในส่วนที่เกี่ยวข้องกับการเก็บรวบรวม การใช้ และการเปิดเผยข้อมูลส่วนบุคคลมีผลใช้บังคับต่อไปตามวัตถุประสงค์เดิม หากท่านไม่ประสงค์ที่จะให้บริษัทฯ เก็บรวมรวมและใช้ข้อมูลส่วนบุคคลดังกล่าวต่อไป ท่านสามารถแจ้งบริษัทฯ เพื่อขอถอนความยินยอมของท่านตามหลักเกณฑ์ที่กฎหมายกำหนดได้
<br>

20. การรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคล

บริษัทฯ มีการใช้มาตรการรักษาความปลอดภัยภายในบริษัทฯ และการใช้บังคับนโยบายอย่างเข้มงวดในการเก็บรักษาข้อมูลส่วนบุคคลของท่านให้ปลอดภัย ซึ่งรวมถึงการเข้ารหัสข้อมูล และมาตรการป้องกันการเข้าถึงข้อมูล โดยบริษัทฯ กำหนดให้บุคลากรของบริษัทฯ และผู้รับจ้างภายนอกจะต้องปฏิบัติตามมาตรฐานและนโยบายที่เหมาะสม รวมถึงจะต้องจัดให้มีการดูแลรักษาข้อมูลและมีมาตรการที่เหมาะสมในการใช้หรือการส่งหรือโอนข้อมูลส่วนบุคคลของท่าน เพื่อดำเนินการป้องกันไม่ให้เกิดการรั่วไหลของข้อมูลส่วนบุคคลและการนําข้อมูลส่วนบุคคลไปใช้โดยไม่ได้รับอนุญาต โดยอย่างน้อยมีมาตรการ ดังต่อไปนี้
<br>
o การควบคุมการเข้าถึงข้อมูลส่วนบุคคล โดยจัดหาอุปกรณ์ในการจัดเก็บ และประมวลผลข้อมูลส่วนบุคคลให้มีความมั่นคงปลอดภัย
<br>
o กำหนดสิทธิเฉพาะผู้ที่เกี่ยวข้องหรือได้รับอนุญาตเท่านั้นที่จะมีสิทธิเข้าถึงข้อมูลส่วนบุคคลในแต่ละเรื่องตามหน้าที่รับผิดชอบ ที่กำหนดไว้ในโครงสร้างของบริษัท
<br>
o การบริหารจัดการการเข้าถึงของผู้ใช้งาน (user access management) เพื่อควบคุมการเข้าถึง
<br>
o การกำหนดหน้าที่ความรับผิดชอบของผู้ใช้งาน (user responsibilities) เพื่อป้องกันการเข้าถึงข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต การเปิดเผย การล่วงรู้ หรือการลักลอบทำสำเนาข้อมูลส่วนบุคคล การลักขโมยอุปกรณ์จัดเก็บหรือประมวลผลข้อมูลส่วนบุคคล
<br>
o กระบวนการบริหารจัดการเหตุการณ์ผิดปกติที่เกี่ยวข้องกับข้อมูลส่วนบุคคล (Privacy Incident Management Procedure) โดยจัดให้มีวิธีการเพื่อให้สามารถตรวจสอบย้อนหลังเกี่ยวกับการเข้าถึง เปลี่ยนแปลง ลบ หรือถ่ายโอนข้อมูลส่วนบุคคล ให้สอดคล้องเหมาะสมกับวิธีการและสื่อที่ใช้ในการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล เพื่อให้สามารถระบุและจัดการกับเหตุการณ์ผิดปกติที่เกี่ยวข้องกับข้อมูลส่วนบุคคลได้อย่างทันท่วงที
<br>


21. สิทธิของท่านเกี่ยวกับข้อมูลส่วนบุคคล

ท่านมีสิทธิดำเนินการเกี่ยวกับข้อมูลส่วนบุคคลของท่านดังต่อไปนี้
<br>
21.1 สิทธิในการเพิกถอน หรือร้องขอให้เปลี่ยนแปลงขอบเขตความยินยอมของท่านที่ได้ให้ไว้กับบริษัทฯ
<br>
21.2 สิทธิในการขอเข้าถึง ขอรับสำเนา หรือขอให้เปิดเผย ถึงการได้มาซึ่งข้อมูลส่วนบุคคลที่เกี่ยวกับท่านโดยท่านไม่ได้ให้ความยินยอม
<br>
21.3 สิทธิในการขอรับข้อมูลส่วนบุคคลที่เกี่ยวกับท่าน หรือขอให้ส่งหรือโอนข้อมูลส่วนบุคคลของท่านไปยังผู้ควบคุมข้อมูลส่วนบุคคลอื่น
<br>
21.4 สิทธิในการคัดค้านการประมวลผลข้อมูลส่วนบุคคล ในกรณีดังต่อไปนี้
<br>
21.4.1 กรณีที่เป็นข้อมูลส่วนบุคคลที่เก็บรวบรวมได้โดยได้รับยกเว้นไม่ต้องขอความยินยอมเนื่องจากเป็นการจำเป็นเพื่อประโยชน์สาธารณะ หรือการจำเป็นเพื่อประโยชน์โดยชอบด้วยกฎหมายตามมาตรา 24 (4) หรือ (5) แห่งพ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล เว้นแต่บริษัทสามารถพิสูจน์ได้ว่ามีเหตุอันชอบด้วยกฎหมายที่สำคัญยิ่งกว่า หรือเป็นไปเพื่อก่อตั้งสิทธิเรียกร้องตามกฎหมาย การปฏิบัติตามหรือการใช้สิทธิเรียกร้องตามกฎหมาย หรือการยกขึ้นต่อสู้สิทธิเรียกร้องตามกฎหมาย
<br>
21.4.2 การประมวลผลข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์เกี่ยวกับการตลาดแบบตรง
<br>
21.4.3 การประมวลผลส่วนบุคคลเพื่อวัตถุประสงค์เกี่ยวกับการศึกษาวิจัยทางวิทยาศาสตร์ ประวัติศาสตร์ หรือสถิติ เว้นแต่เป็นการจำเป็นเพื่อการดำเนินภารกิจเพื่อประโยชน์สาธารณะของบริษัทฯ
<br>
21.5 สิทธิในการขอให้ลบ หรือทำลาย หรือทำให้ข้อมูลส่วนบุคคลเป็นข้อมูลที่ไม่สามารถระบุตัวบุคคลที่เป็นเจ้าของข้อมูลส่วนบุคคลได้ ตามหลักเกณฑ์ที่กฎหมายกำหนด
<br>
21.6 สิทธิในการขอให้ระงับการประมวลผลข้อมูลส่วนบุคคลของท่านตามหลักเกณฑ์ที่กฎหมายกำหนด
<br>
21.7 สิทธิในการขอให้แก้ไขข้อมูลส่วนบุคคลใดๆ ที่เกี่ยวข้องกับท่าน ให้ถูกต้อง เป็นปัจจุบัน สมบูรณ์และไม่ก่อให้เกิดความเข้าใจผิด หากบริษัทฯ ไม่สามารถดำเนินการให้ได้ ท่านมีสิทธิขอบันทึกคำร้องขอของท่านพร้อมเหตุผลในการดำเนินการได้ตามหลักเกณฑ์ที่กฎหมายกำหนด
<br>
21.8 สิทธิในการร้องเรียน ท่านมีสิทธิยื่นข้อร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลในเรื่องเกี่ยวกับการประมวลผลข้อมูลส่วนบุคคลของบริษัทฯ ได้ ตามขั้นตอนที่กฎหมายกำหนด ทั้งนี้ บริษัทฯ ขอสงวนสิทธิในการปฏิเสธที่จะดำเนินการตามคำขอใช้สิทธิของเจ้าของข้อมูลส่วนบุคคลของท่านตามความเหมาะสม และตามหลักเกณฑ์ที่กฎหมายกำหนด อย่างไรก็ดี ในกรณีที่กฎหมายอนุญาต บริษัทฯ อาจมีการเรียกเก็บค่าใช้จ่าย ในการดำเนินการตามสิทธิของ เจ้าของข้อมูลส่วนบุคคล ที่ท่านร้องขอตามความเหมาะสม
<br>
22. การแก้ไขเปลี่ยนแปลงนโยบายฉบับนี้

บริษัทฯ ขอสงวนสิทธิ์ในการแก้ไข เพิ่มเติม เปลี่ยนแปลง ปรับปรุง หรือปรับเปลี่ยนนโยบายฉบับนี้ เท่าที่กฎหมายอนุญาต หากเป็นการเปลี่ยนแปลงในสาระสำคัญของนโยบายฉบับนี้ บริษัทฯ จะแจ้งการแก้ไข การเปลี่ยนแปลง การปรับปรุง หรือการปรับเปลี่ยนนโยบายให้ท่านทราบ และ/หรือจะขอความยินยอมจากท่าน (หากกฎหมายกำหนดให้ต้องได้รับความยินยอม)

<br>
23. ช่องทางการติดต่อ

หากท่านมีข้อสงสัยเกี่ยวกับเนื้อหาส่วนใด ๆ ในนโยบายการคุ้มครองข้อมูลส่วนบุคคลฉบับนี้ หรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับแนวทางปฏิบัติของบริษัทฯ เกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน หรือต้องการใช้สิทธิเกี่ยวกับข้อมูลส่วนบุคคลของท่านกรุณาติดต่อ เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (Data Protection officer)

สัญญานี้ทำขึ้นสองฉบับมีข้อความถูกต้องตรงกัน คู่สัญญาแต่ละฝ่ายได้อ่านโดยตลอดแล้ว เห็นว่าถูกต้องตามความประสงค์ จึงลงลายมือชื่อและประทับตราสำคัญของบริษัท(ถ้ามี) ไว้เป็นสำคัญต่อหน้าพยาน

          <b class="text-center"><input type="checkbox" v-model="statuspdpa" > ข้าพเจ้าได้อ่านและยอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคล</b>
      </div>
    <div class="flex justify-center mt-5">
      <button  @click=" accpetcontact()"  :disabled="!statuspdpa"
      class="text-white bg-[#116530] hover:bg-[#0B4619] focus:ring-4 focus:outline-none 
      focus:ring-[#146356] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2" :class="!statuspdpa? 'opacity-50':''" >ลงนามสัญญา</button>
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


const statuspdpa = ref(false);
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

const signdata = ref([]);
const optionsign = ref([]);
const signname = ref('');
const signatureadd = async (id) => {
    const data = optionsign.value.find((item) => item._id == signname.value);
    console.log(data);
    signdata.value.push(data);
    signname.value = "";
};

const signaturedelete = (id) => {
    signdata.value = signdata.value.filter((item) => item._id != id);
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