import { createApp } from "vue";
import App from "./App.vue";

import jwtDecode from "jwt-decode";

import PrimeVue from "primevue/config";
import "primeicons/primeicons.css"; //icons
import "primevue/resources/primevue.min.css"; //core css
import "primevue/resources/themes/lara-light-purple/theme.css"; //theme
//prime flex
import "primeflex/primeflex.css";
import Chart from 'primevue/chart';
import router from "./router";
import routerPartner from "./router/partner";


import store from "./store";

const app = createApp(App);

import InputText from "primevue/inputtext";
import Button from "primevue/button";

import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import ProgressSpinner from "primevue/progressspinner";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Image from "primevue/image";
import Panel from 'primevue/panel';
import Dropdown from "primevue/dropdown";
import InputSwitch from 'primevue/inputswitch';
import InputMask from 'primevue/inputmask';
import Card from 'primevue/card';
import FileUpload from 'primevue/fileupload';
import Password from 'primevue/password';
import Chips from 'primevue/chips';
import Chip from "primevue/chip";
import Sidebar from "primevue/sidebar";
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'  // optional
import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import TreeTable from 'primevue/treetable';

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(store);

try {
  const token = localStorage.getItem("token");
  const jwt_decode = jwtDecode(token);
  if (jwt_decode.position === "partner") {
    app.use(routerPartner);
  } 
   else {
    app.use(router);
  }
  
} catch (err) {
  app.use(router);
}

app.component("InputText", InputText);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Dialog", Dialog);
app.component("Menubar", Menubar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Dropdown", Dropdown);
app.component("Textarea", Textarea);
app.component("InputNumber", InputNumber);
app.component("Image", Image);
app.component("Panel", Panel);
app.component("InputSwitch", InputSwitch);
app.component("InputMask", InputMask);
app.component("Card", Card);
app.component("FileUpload", FileUpload);
app.component("Password", Password);
app.component("Chips", Chips);
app.component("Chip", Chip);
app.component("Sidebar", Sidebar);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("Badge", Badge);
app.component("Tag", Tag);
app.component("Calendar",Calendar)
app.component("Checkbox",Checkbox)
app.component("Chart",Chart)
app.component("TreeTable",TreeTable)
app.mount("#app");
