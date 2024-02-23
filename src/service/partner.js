import axios from "axios";

export class Partner {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_API;
  #baseUrl2 = process.env.VUE_APP_OFFICE;
  #baseUrl3 = process.env.VUE_APP_CONTACT;
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
  async Addfilecompany(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/filecompany/${id}`,
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
  async AddLogo(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/logo/${id}`,
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

  async Addsignature(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/addsignature/${id}`,
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

  async Deletesignature(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/deletesignature/${id}`,
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
  async Getbypartnerid(id) {
    let data;
    const config = {
      method: "get",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/byid/${id}`,
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
  async EditPartner(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/${id}`,
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

  async GetContract(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl3}/partner-contract/all-me/`,
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
  async CancleContract(packageData,id){
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl3}/HaveplaceNocapital/AddStatus/${id}`,
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
  async AccpetContract(packageData,id){
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl3}/partner-contract/sign/${id}`,
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

  async PaidContract(packageData,id){
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl3}/partner-contract/paid/${id}`,
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
  async EditContract(packageData,id){
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl3}/HaveplaceNocapital/AddStatus/${id}`,
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
  
  //เรียกจังหวัดจังหวัด
  async GetProvince() {
    let data;
    const config = {
      method: "get",
      // headers: {
      //   "token": this.#token,
      // },
      url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json`,
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
  //เรียกอำเภอ
  async GetAmphure(id) {
    let data;
    const config = {
      method: "get",
      // headers: {
      //   "token": this.#token,
      // },
      url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`,
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
  //เรียกตำบล
  async GetTambon(id) {
    let data;
    const config = {
      method: "get",
      // headers: {
      //   "token": this.#token,
      // },
      url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`,
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

  //ส่งข้อมูลให้ adimn อนุมัติ
  async SendAdmin(packageData,id) {
    let data;
    const config = {
      method: "put",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl}/partner/WaitForApproval/${id}`,
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
 
  //ส่งข้อมูลpdpa
  async Sendpdpa(packageData) {
    let data;
    const config = {
      method: "post",
      headers: {
        "token": this.#token,
      },
      url: `${this.#baseUrl3}/partner-contract/create/`,
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
