import {createStore} from "vuex";
export default createStore({
  state: {
    isLoading: false,
    logedIn: false,
    token: localStorage.getItem("token"),
    _id:"",
    username:"",
    partner_name: "",
    partner_phone: "",
    partner_email:"",
    position:"",
    status_otp:"",
    status_appover: "",
  },
  getters: {
    isLoading: (state) => state.isLoading,
    logedIn: (state) => state.logedIn,
    token: (state) => state.token,
    _id: (state) => state._id,
    username: (state) => state.username,
    partner_name:(state) => state.partner_name,
    partner_phone:(state)=>state.partner_phone,
    partner_email:(state)=> state.partner_email,
    position: (state) => state.position,
    status_otp: (state) => state.status_otp,
    status_appover: (state) => state.status_appover,

  },
  mutations: {
    setLoading(state, item) {
      state.isLoading = item;
    },
    setLogin(state, item) {
      (state.logedIn = item.logedIn),

        (state._id = item._id),
        (state.username = item.username),
        (state.partner_name = item.partner_name),
        (state.partner_phone = item.partner_phone),
        (state.partner_email = item.partner_email),
        (state.position = item.position);
        (state.status_otp = item.status_otp);
        (state.status_appover = item.status_appover);

    },
    setLoginDefault(state) {
      (state.token = ""), (state.logedIn = false);
    },
    setToken(state, item) {
      state.token = item;
    },
    openLoading(state) {
      state.isLoading = true;
    },
    closeLoading(state) {
      state.isLoading = false;
    },
   
  },
  actions: {},
  modules: {},
});
