<template>
  <div class="font">
    <Menubar :model="items" class="custom-menubar border-none border-top-3 border-green-700 m-0 p-0 bg-green-200 ">
      <template #start>
        <h2 class="pl-5 mx-4 p-0 m-0 mt-3"><img alt="logo" :src="require('@/assets/smartpro.png')" class="logo"
            width="55" /></h2>
      </template>
      <template #item="{ item, props, hasSubmenu,root }">
        <div class="mt-2 ">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate"
              class="text-green-900 font-bold hover:text-white">
              <span :class="item.icon" class="font-bold" />
              <span class="ml-2  text-md">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action"
            class="text-green-900 font-bold hover:text-white">
            <span :class="item.icon" class="font-bold" />
            <span class="ml-2 text-md">{{ item.label }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
          </a>
        </div>
      </template>
      <template #end>
        <Button class="text-green-900 font hover:text-white hover:bg-blue-800 mr-3" label="ออกจากระบบ"
          icon="pi pi-power-off" @click="logout()" text />
      </template>
    </Menubar>
  </div>
</template>
<script>
import Menubar from "primevue/menubar";
import { ref } from "vue";
import { useRouter } from 'vue-router';
export default {
  components: {
    Menubar,
  },
  setup() {
    const router = useRouter();
    const items = ref([
      {
        label: "หน้าหลัก",
        icon: "pi pi-fw pi-fw pi-home",
        command: () => {
          router.push("/admin");
        }
      },

      {
        label: "กำหนดสิทธิ์ผู้ใช้งาน",
        icon: "pi pi-fw pi-fw pi-user",
        command: () => {
          router.push("/userview");
        }
      },
      {
        label: "ข้อมูลพื้นฐาน",
        icon: "pi pi-list",
        items: [
          {
            label: "ข้อมูลพื้นฐาน",
            icon: "pi pi-list",
            command: () => {
              router.push("/admin/information");
            }
          },
          {
            label: "ประเภทสินค้า",
            icon: "pi pi-fw pi-fw pi-book",
            command: () => {
              router.push("/admin/producttype");
            }
          },
          {
            label: "ประเภทธุรกิจ",
            icon: 'pi pi-book',
            command: () => {
              router.push("/admin/typebusiness");
            }
          }
          , {
            label: "ประเภทธุรกิจของลูกค้า",
            icon: 'pi pi-book',
            command: () => {
              router.push("/admin/typebusinesscustomer");
            }
          },
          {
            label: "ประเภทอุตสาหกรรมของลูกค้า",
            icon: 'pi pi-book',
            command: () => {
              router.push("/admin/typelndustry");
            }
          },
        ]

      },
      {
        label: " ใบราคา",
        icon: "pi pi-book",
        items: [
          {
            label: " ใบเสนอราคา",
            icon: 'pi pi-book',
            command: () => {
              router.push("/quotation/adminquotation/");
            }
          },
          {
            label: " ใบสั่งซื้อ",
            icon: 'pi pi-book',
            command: () => {
              router.push("/purchaseorder/adminpurchaseorders/");
            }
          },

        ]
      },
      {
        label: "report",
        icon: "pi pi-book",
        items: [
          {
            label: "แผนก Sales Department",
            icon: "pi pi-book",
            items:[
              {
                label: "report ใบเสนอราคา",
                icon: 'pi pi-book',
                command: () => {
                  router.push("/admin/reportquotation");
                }
              },
              {
                label: "report ยอดขาย",
                icon: 'pi pi-book',
                command: () => {
                  router.push("/admin/reportprice");
                }
              },
              {
                label: "report sales department",
                icon: 'pi pi-book',
                command: () => {
                  router.push("/admin/reportsale");
                }
              },
            ]
          },        
          

        ]
      },
      {
        label: "ข้อมูลส่วนตัว",
        icon: "pi pi-fw pi-fw pi-user",
        command: () => {
          router.push("/edituser");
        }
      }
    ]);
    return { items };
  },
  methods: {
    logout() {
      this.$confirm.require({
        message: "ต้องการออกจากระบบนี้?",
        header: "ออกจากระบบ",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "ออกจากระบบ",
        acceptClass: "p-button-danger",
        acceptIcon: "pi pi-fw pi-power-off",
        rejectLabel: "ยกเลิก",
        accept: async () => {
          localStorage.clear();
          this.$store.commit("ClearLogin");
        },
      });
    },
  },
};
</script>

<style scoped>
/* ปรับแต่งพื้นหลังเป็นสีขาว */
.p-menubar {
  font-family: 'Kanit';
  src: url('@/assets/Kanit/Kanit-Regular.ttf') format('truetype');
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  /* เส้นด้านล่าง */
  border-radius: 0px;
}

/* ปรับแต่งเส้นสีขอบของรายการเมนูเมื่อ hover */
.p-menubar .p-menuitem-link:hover {
  color: #fff
}

.font {
  font-family: 'Kanit';
  src: url('@/assets/Kanit/Kanit-Regular.ttf') format('truetype');
}
</style>
