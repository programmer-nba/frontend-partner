import axios from "axios";

export class Partner {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_API;
  #baseUrl2 = process.env.VUE_APP_API2;
  constructor() {}

  // รอลบทิ้ง
  async GetUser(){
    let data;
    const config = {
      method: "get",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/user`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  async AddUser(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/user/`,
      data: packageData,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  async EditUser(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/user/${id}`,
      data: packageData,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  async DeleteUser(packageId) {
    let data;
    const config = {
      method: "delete",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/user/${packageId}`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  async GetUserbyid(id) {
    let data;
    const config = {
      method: "get",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/user/byid/${id}`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }


  async AddPartner(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/register/`,
      data: packageData,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }

  async Sendopt(id) {
    let data;
    const config = {
      method: "get",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/sendotp/${id}`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  async Check(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/check/${id}`,
      data: packageData,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }

  async AddBankBook(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/bankbook/${id}`,
      data: packageData,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  async AddIdcard(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/idcard/${id}`,
      data: packageData,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
  async AddSignature(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/signature/${id}`,
      data: packageData,
    };
    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }






  async AddPartner2(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl2}/partners/register`,
      data: packageData,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }
}
