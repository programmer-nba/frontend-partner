<template >
  <div v-if="this.$store.getters.logedIn === true" class="" >
    <NavberPartner v-if="this.$store.getters.position === 'partner'" />
    <router-view  /> 
  </div>

  <div v-else>
    <LoginPage />
  </div>
  <Toast />
  <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback}">
            <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                <div class="border-circle bg-blue-700 inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                    <i class="pi pi-question text-5xl text-white"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex align-items-center gap-2 mt-4">
                    <Button label="ตกลง" class="bg-blue-700 border-none" @click="acceptCallback"></Button>
                    <Button label="ยกเลิก" severity="danger" outlined @click="rejectCallback"></Button>
                </div>
            </div>
        </template>

  </ConfirmDialog>
  <!-- dialog loading-->
  <Dialog class="border-0 shadow-none" :draggable="false" v-model:visible="this.$store.getters.loading" :closable="false"
    :modal="true">
    <ProgressSpinner style="width: 80px; height: 80px" strokeWidth="5" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" /><br />
  </Dialog>
</template>

<script>
import LoginPage from '@/views/LoginView.vue';
import NavberPartner from '@/components/template/NavbarPartner.vue';

import axios from 'axios';
// import jwtDecode from "jwt-decode";
export default {

  components: {
    LoginPage,
    NavberPartner,

  },
  async beforeCreate() {
    if (localStorage.getItem("token") !== null) {
      await axios
        .get(`${process.env.VUE_APP_API}/partner/me/`, {
          headers: {
            "token": `${localStorage.getItem("token")}`,
          },
        })
        .then(async (res) => {
          // const decode = jwtDecode(localStorage.getItem("token"));
          const data_login = {
            logedIn: true,
            _id:res.data.data._id,
            username:res.data.data.username,
            firstname:res.data.data.firstname,
            lastname:res.data.data.lastname,
            nickname:res.data.data.nickname,
            position:res.data.data.position,
          };
          this.$store.commit("setLogin", data_login);
          console.log(this.$store.getters.position);
          if (this.$store.getters.position === 'partner') {
              this.$router.push("/partner")
          }

          
        })
        .catch(() => {
          localStorage.clear();
          this.$store.commit("ClearLogin");
          this.$router.push("/login");
        });
    } else {
      localStorage.clear();
      this.$store.commit("ClearLogin");
      this.$router.push("/login");
    }
  }
}
</script>

<style>
.p-menuitem-icon{
  color:#0e4f26;
  
}
.p-menubar .p-menubar-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover .p-menuitem-link .p-menuitem-text{
  color:#fff;
}
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text{
  color:#0e4f26;
}
.p-menuitem-content:hover{
  background: #354390;
}
.p-menuitem-content{
  background: none;
}
#app {
  font-family: 'Kanit';
  src: url('@/assets/Kanit/Kanit-Regular.ttf') format('truetype');
}
.font{
  font-family: 'Kanit' !important;
  src: url('@/assets/Kanit/Kanit-Regular.ttf') format('truetype') !important;
}
.p-component{
   font-family: 'Kanit';
  src: url('@/assets/Kanit/Kanit-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal; 
}
.p-inputtext{
  font-family: 'Kanit' !important;
  src: url('@/assets/Kanit/Kanit-Regular.ttf') format('truetype') !important;
}
</style>
<style>
@font-face {
  font-family: 'Kanit';
  src: url('@/assets/Kanit/Kanit-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.p-datatable .p-datatable-thead > tr > th {
  background-color: #295bac !important;
  color: #effcef;
}
</style>