<template>
    <div class="grid">
        <div class="text-center col-12  mt-5">
            <h1>Welcome Partner</h1>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, computed,watchEffect } from "vue";
    import { useStore } from "vuex";
    import { useToast } from "primevue/usetoast";
    import { useConfirm } from "primevue/useconfirm";
    import "@/components/loadingStyle.css";
    import { Partner } from "@/service/partner";
    import store from "@/store";
    // กำหนดตัวแปร
    const partner = new Partner();
    const $stores = useStore();
    const $toast = useToast();
    const $confirm = useConfirm();
    const list_user = ref([]);
    const dialog = ref(false);
    const title_dialog = ref("");
    const loading = ref(false);
</script>
