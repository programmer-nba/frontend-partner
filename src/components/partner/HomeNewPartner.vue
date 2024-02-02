<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
  <nav class="bg-white w-full flex relative shadow justify-between items-center px-8 h-20">
    <!-- logo -->


    <button @click="confirmLogout"
      class="block w-full py-3 px-6 text-center rounded-xl transition bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus:bg-indigo-600">
      <span class="text-white font-semibold">
        ออกจากระบบ
      </span>
    </button>
    <!-- end login -->
  </nav>

  <div class="flex flex-col border rounded-lg overflow-hidden bg-white">
    <div class="grid grid-cols-1 sm:grid-cols-4">
      <div class="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
        <p class="text-xl font-bold text-[#0ed3cf] rounded-full">ข้อมูลลงทะเบียน</p>
      </div>
      <div class="flex flex-col sm:border-l col-span-3">

        <div class="flex flex-col space-y-4  p-6 text-gray-600">
          <div class="flex flex-row text-sm">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24"
                width="20px" fill="#64748b">
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <path
                    d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
                </g>
              </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">Name:</span>
              <span>{{ userData.partner_name }} </span>
            </p>
          </div>

          <div class="flex flex-row text-sm">
            <span class="mr-3">

              <svg width="20px" height="20px" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48m0 400H303.2c.9-4.5.8 3.6.8-22.4c0-31.8-30.1-57.6-67.2-57.6c-10.8 0-18.7 8-44.8 8c-26.9 0-33.4-8-44.8-8c-37.1 0-67.2 25.8-67.2 57.6c0 26-.2 17.9.8 22.4H48V144h480zm-168-80h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m-168 96c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64" />
              </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">IDCard:</span>
              <span>{{ userData.iden_number }}</span>
            </p>
          </div>
          <div class="flex flex-row text-sm">
            <span class="mr-3">

              <svg width="20px" height="20px" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M14.5 13h-13C.67 13 0 12.33 0 11.5v-9C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v9c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-9c0-.28-.22-.5-.5-.5z" />
                <path fill="currentColor"
                  d="M8 8.96c-.7 0-1.34-.28-1.82-.79L.93 2.59c-.19-.2-.18-.52.02-.71c.2-.19.52-.18.71.02l5.25 5.58c.57.61 1.61.61 2.18 0l5.25-5.57c.19-.2.51-.21.71-.02c.2.19.21.51.02.71L9.82 8.18c-.48.51-1.12.79-1.82.79Z" />
                </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">E-mail:</span>
              <span>{{ userData.partner_email }}</span>
            </p>
          </div>
          <div class="flex flex-row text-sm">
            <span class="mr-3">

              <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608a17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">Phone:</span>
              <span>{{ userData.partner_phone }}</span>
            </p>
          </div>


        </div>

        <div class="flex flex-col w-full relative bottom-0">
          <div class="grid grid-cols-1 border-t divide-x text-[#0ed3cf]  bg-gray-50  py-3">


            <a class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
              <div class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0ed3cf">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg>
              </div>
              ดูเพิ่มเติม
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- <p>Status Partner: {{ status_appover }}</p> -->


  


  <div class="bg-[#064635]">
    <div class=" flex items-center justify-center w-10/12 m-auto">


      <!-- Left Layout (Desktop) -->
      <div class="hidden md:flex md:w-1/2 p-8">
        <img src="" alt="">
      </div>

      <!-- Right Layout (Both Mobile and Desktop) -->
      <div class="w-full md:w-1/2 p-4 md:p-4">
        <h1 class="text-2xl md:text-4xl font-bold text-[#B4FE98] mb-4">กรุณารอแอดมินตรวจสอบ</h1>
        <button @click="handleLoginButtonClick"
          class="px-6 py-3 bg-[#FF9BD2] text-white rounded-lg inline-block hover:bg-[#D63484] transition duration-300 ease-in-out">เข้าใช้ระบบ</button>


        <section class="bg-white p-2 m-3 rounded">
          <h4 class="text-xl">สถานะการตรวจสอบ</h4>
          <div class="flex flex-col lg:flex-row items-center gap-5 mt-5">
            <div class="flex justify-evenly items-center w-96 lg:w-full p-3 m-3 border border-[#D63484] rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class=" w-20 h-20" :class="{
                  'text-green-400': status_appover === 'ได้รับการอนุมัติแล้ว',
                  'text-yellow-400': status_appover === 'รออนุมัติ',
                  'text-gray-400': !['ได้รับการอนุมัติแล้ว', 'รออนุมัติ'].includes(status_appover),
                }">

                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <div class="text-center">
                <h2 class="text-4xl text-[#D63484] font-bold pb-2"> {{
                  status_appover === 'ได้รับการอนุมัติแล้ว' ? '100%' :
                  status_appover === 'รออนุมัติ' ? '50%' :
                    '0%'
                }}
                </h2>
                <h4 class="inline text-[#E26EE5] text-md"> {{
                  status_appover === 'ได้รับการอนุมัติแล้ว' ?
                  'ได้รับการอนุมัติแล้ว คุณสามารถเข้าใช้ระบบได้' :
                  status_appover === 'รออนุมัติ' ?
                    'กรุณารอแอดมินตรวจสอบข้อมูลของท่าน' : ''
                }}
                </h4>
              </div>
            </div>


          </div>
        </section>
      </div>

    </div>
  </div>



  <div class="app bg-gray-100">

<nav class="bg-white w-full flex relative shadow justify-between items-center px-8 h-20">


    <!-- end logo -->


    <!-- end search bar -->

    <!-- login -->
    <div class="flex-initial">
      <div class="flex justify-end items-center relative">
       
      

        <div class="block">
            <div class="inline relative">
                <button type="button" class="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg">
                    <div class="pl-1">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;">
                            <g fill="none" fill-rule="nonzero">
                                <path d="m2 16h28"></path>
                                <path d="m2 24h28"></path>
                                <path d="m2 8h28"></path>
                            </g>
                        </svg>
                    </div>

                    <div class="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 100%; width: 100%; fill: currentcolor;">
                            <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
      </div>
    </div>
    <!-- end login -->
</nav>

<main class="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12  w-2xl container px-2 mx-auto">

    <aside class="">
    
        <div class="bg-white shadow rounded-lg p-10">
          <section class="bg-white p-2 m-3 rounded">
          <h4 class="text-xl">สถานะการตรวจสอบ</h4>
          <div class="flex flex-col lg:flex-row items-center gap-5 mt-5">
            <div class="flex justify-evenly items-center w-full p-3 m-3 border border-[#D63484] rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class=" w-20 h-20" :class="{
                  'text-green-400': status_appover === 'ได้รับการอนุมัติแล้ว',
                  'text-yellow-400': status_appover === 'รออนุมัติ',
                  'text-gray-400': !['ได้รับการอนุมัติแล้ว', 'รออนุมัติ'].includes(status_appover),
                }">

                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <div class="text-center">
                <h2 class="text-4xl text-[#D63484] font-bold pb-2"> {{
                  status_appover === 'ได้รับการอนุมัติแล้ว' ? '100%' :
                  status_appover === 'รออนุมัติ' ? '50%' :
                    '0%'
                }}
                </h2>
                <h4 class="inline text-[#E26EE5] text-md"> {{
                  status_appover === 'ได้รับการอนุมัติแล้ว' ?
                  'ได้รับการอนุมัติแล้ว คุณสามารถเข้าใช้ระบบได้' :
                  status_appover === 'รออนุมัติ' ?
                    'กรุณารอแอดมินตรวจสอบข้อมูลของท่าน' : ''
                }}
                </h4>
              </div>
            </div>


          </div>
        </section>
        </div>

        <div class="bg-white shadow mt-6  rounded-lg p-6">
            <h3 class="text-gray-600 text-sm font-semibold mb-4">Following</h3>
            <ul class="flex items-center justify-center space-x-2">
                <!-- Story #1 -->
                <li class="flex flex-col items-center space-y-2">
                    <!-- Ring -->
                    <a class="block bg-white p-1 rounded-full" href="#">
                        <img class="w-16 rounded-full" src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80">
                    </a>
                    <!-- Username -->
                    <span class="text-xs text-gray-500">
                        Sage
                    </span>
                </li>

                <!-- Story #1 -->
                <li class="flex flex-col items-center space-y-2">
                    <!-- Ring -->
                    <a class="block bg-white p-1 rounded-full" href="#">
                        <img class="w-16 rounded-full" src="https://images.unsplash.com/photo-1638649602320-450b717fa622?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80">
                    </a>
     

                    <!-- Username -->
                    <span class="text-xs text-gray-500">
                        Jett
                    </span>
                </li>

                <!-- Story #2 -->
                <li class="flex flex-col items-center space-y-2">
                    <!-- Ring -->
                    <a class="block bg-white p-1 rounded-full" href="#">
                        <!-- Thumbnail -->
                        <img class="w-16 rounded-full" src="https://images.unsplash.com/photo-1638708644743-2502f38000a0?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80">
                    </a>

                    <!-- Username -->
                    <span class="text-xs text-gray-500">
                        Sky
                    </span>
                </li>

                <!-- Story #3 -->
                <li class="flex flex-col items-center space-y-2">
                    <!-- Ring -->
                    <a class="block bg-white p-1 rounded-full" href="#">
                        <!-- Thumbnail -->
                        <img class="w-16 rounded-full" src="https://images.unsplash.com/photo-1638691899851-0e955bceba1f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80">
                    </a>
        
                    <!-- Username -->
                    <span class="text-xs text-gray-500">
                        Olivia
                    </span>
                </li>

                <!-- Story #4 -->
                <li class="flex flex-col items-center space-y-2">
                    <!-- Ring -->
                    <a class="block bg-white p-1 rounded-full" href="#">
                        <img class="w-16 rounded-full" src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80">
                    </a>
        

                    <!-- Username -->
                    <span class="text-xs text-gray-500">
                        Julia
                    </span>
                </li>
                <!-- Story #1 -->
                <li class="flex flex-col items-center space-y-2">
                    <!-- Ring -->
                    <a class="block bg-white p-1 rounded-full" href="#">
                        <!-- Thumbnail -->
                        <img class="w-16 rounded-full" src="https://images.unsplash.com/photo-1638649602320-450b717fa622?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80">
                    </a>
                

                    <!-- Username -->
                    <span class="text-xs text-gray-500">
                        Hendrick
                    </span>
                </li>

            </ul>
        </div>

        <div class="flex bg-white shadow mt-6  rounded-lg p-2">
            <img src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80" alt="Just a flower" class=" w-16  object-cover  h-16 rounded-xl">
            <div class="flex flex-col justify-center w-full px-2 py-1">
                <div class="flex justify-between items-center ">
                    <div class="flex flex-col">
                        <h2 class="text-sm font-medium">Massive Dynamic</h2>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                    </svg>
                </div>
                <div class="flex pt-2  text-sm text-gray-400">
                    <div class="flex items-center mr-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <p class="font-normal">4.5</p>
                    </div>
                    <div class="flex items-center font-medium text-gray-900 ">
                        $1800
                        <span class="text-gray-400 text-sm font-normal"> /wk</span>
                    </div>
                </div>
            </div>
        </div>

   

    </aside>

    <article class="">

        <form class="bg-white shadow rounded-lg mb-6 p-4">
          <div class="flex flex-col border rounded-lg overflow-hidden bg-white">
    <div class="grid grid-cols-1 sm:grid-cols-4">
      <div class="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
        <p class="text-xl font-bold text-[#0ed3cf] rounded-full">ข้อมูลลงทะเบียน</p>
      </div>
      <div class="flex flex-col sm:border-l col-span-3">

        <div class="flex flex-col space-y-4  p-6 text-gray-600">
          <div class="flex flex-row text-sm">
            <span class="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24"
                width="20px" fill="#64748b">
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                <g>
                  <path
                    d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
                </g>
              </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">Name:</span>
              <span>{{ userData.partner_name }} </span>
            </p>
          </div>

          <div class="flex flex-row text-sm">
            <span class="mr-3">

              <svg width="20px" height="20px" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48m0 400H303.2c.9-4.5.8 3.6.8-22.4c0-31.8-30.1-57.6-67.2-57.6c-10.8 0-18.7 8-44.8 8c-26.9 0-33.4-8-44.8-8c-37.1 0-67.2 25.8-67.2 57.6c0 26-.2 17.9.8 22.4H48V144h480zm-168-80h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8m-168 96c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64" />
              </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">IDCard:</span>
              <span>{{ userData.iden_number }}</span>
            </p>
          </div>
          <div class="flex flex-row text-sm">
            <span class="mr-3">

              <svg width="20px" height="20px" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M14.5 13h-13C.67 13 0 12.33 0 11.5v-9C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v9c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-9c0-.28-.22-.5-.5-.5z" />
                <path fill="currentColor"
                  d="M8 8.96c-.7 0-1.34-.28-1.82-.79L.93 2.59c-.19-.2-.18-.52.02-.71c.2-.19.52-.18.71.02l5.25 5.58c.57.61 1.61.61 2.18 0l5.25-5.57c.19-.2.51-.21.71-.02c.2.19.21.51.02.71L9.82 8.18c-.48.51-1.12.79-1.82.79Z" />
                </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">E-mail:</span>
              <span>{{ userData.partner_email }}</span>
            </p>
          </div>
          <div class="flex flex-row text-sm">
            <span class="mr-3">

              <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608a17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42a18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
            </span>
            <p class="flex items-center  text-gray-500">
              <span class="font-semibold mr-2 text-xs uppercase">Phone:</span>
              <span>{{ userData.partner_phone }}</span>
            </p>
          </div>


        </div>

        <div class="flex flex-col w-full relative bottom-0">
          <div class="grid grid-cols-1 border-t divide-x text-[#0ed3cf]  bg-gray-50  py-3">


            <a class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
              <div class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#0ed3cf">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg>
              </div>
              ดูเพิ่มเติม
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>    
        </form>

        <div class="bg-white shadow rounded-lg mb-6">
            <div class="flex flex-row px-2 py-3 mx-3">
                <div class="w-auto h-auto rounded-full">
                    <img class="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80">
                </div>
                <div class="flex flex-col mb-2 ml-4 mt-1">
                    <div class="text-gray-600 text-sm font-semibold">John Doe</div>
                    <div class="flex w-full mt-1">
                        <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                            SEO
                        </div> 
                        <div class="text-gray-400 font-thin text-xs">
                            • 30 seconds ago
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-b border-gray-100"></div> 
            <div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                <div class="grid grid-cols-6 col-span-2   gap-2  ">
                    <div class=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                        <img class="h-full w-full object-cover " src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80" alt="">
                    </div>
                    <div class=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                        <img class="h-full w-full object-cover  " src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1399&amp;q=80" alt="">
                    </div>
                    <div class=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                        <img class="h-full w-full object-cover " src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80" alt="">
                    </div>
                    <div class=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                        <img class="h-full w-full object-cover " src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80" alt="">
                    </div>
                    <div class="relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
                        <div class="text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center">
                        + 23
                        </div>
                        <img class="h-full w-full object-cover " src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=765&amp;q=80" alt="">
                    </div>
                </div>
            </div>
            <div class="text-gray-500 text-sm mb-6 mx-3 px-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</div>
            <div class="flex justify-start mb-4 border-t border-gray-100">
                <div class="flex w-full mt-1 pt-2 pl-5">
                    <span class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                    </span>
                    <img class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
                    <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
                    <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80" alt="">
                    <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80" alt="">
                </div>
                <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                    <span class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                    </span>
                    <span class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                        <svg class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="flex w-full border-t border-gray-100">
                <div class="mt-3 mx-5 flex flex-row text-xs">
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Comments:<div class="ml-1 text-gray-400 text-ms"> 30</div></div>
                    <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Views: <div class="ml-1 text-gray-400 text-ms"> 60k</div></div>
                </div>
                <div class="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div class="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes: <div class="ml-1 text-gray-400  text-ms"> 120k</div></div>
                </div>
            </div>
            <div class="text-black p-4 antialiased flex">
                <img class="rounded-full h-8 w-8 mr-2 mt-1 " src="https://picsum.photos/id/1027/200/200">
                <div>
                    <div class="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                        <div class="font-semibold text-sm leading-relaxed">Sara Lauren</div>
                        <div class="text-xs leading-snug md:leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                    </div>
                    <div class="text-xs  mt-0.5 text-gray-500">14 w</div>
                    <div class="bg-white border border-white rounded-full float-right -mt-8 mr-0.5 flex shadow items-center ">
                        <svg class="p-0.5 h-5 w-5 rounded-full z-20 bg-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><defs><linearGradient id="a1" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#18AFFF"></stop><stop offset="100%" stop-color="#0062DF"></stop></linearGradient><filter id="c1" width="118.8%" height="118.8%" x="-9.4%" y="-9.4%" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1"></feGaussianBlur><feOffset dy="-1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset><feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite><feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0"></feColorMatrix></filter><path id="b1" d="M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z"></path></defs><g fill="none"><use fill="url(#a1)" xlink:href="#b1"></use><use fill="black" filter="url(#c1)" xlink:href="#b1"></use><path fill="white" d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z"></path></g></svg>
                        <svg class="p-0.5 h-5 w-5 rounded-full -ml-1.5 bg-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><defs><linearGradient id="a2" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#FF6680"></stop><stop offset="100%" stop-color="#E61739"></stop></linearGradient><filter id="c2" width="118.8%" height="118.8%" x="-9.4%" y="-9.4%" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1"></feGaussianBlur><feOffset dy="-1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset><feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite><feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0"></feColorMatrix></filter><path id="b2" d="M8 0a8 8 0 100 16A8 8 0 008 0z"></path></defs><g fill="none"><use fill="url(#a2)" xlink:href="#b2"></use><use fill="black" filter="url(#c2)" xlink:href="#b2"></use><path fill="white" d="M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41"></path></g></svg>
                        <span class="text-sm ml-1 pr-1.5 text-gray-500">3</span>
                    </div>
                </div>
            </div>
            <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                <img class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80">
                <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                    <button type="submit" class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                    <svg class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>

                    </button>
                </span>
                    <input type="search" class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400" style="border-radius: 25px" placeholder="Post a comment..." autocomplete="off">
            </div>
        </div>

        <div class="bg-white shadow rounded-lg">
                <div class="flex flex-row px-2 py-3 mx-3">
                    <div class="w-auto h-auto rounded-full border-2 border-green-500">
                        <img class="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200">
                    </div>
                    <div class="flex flex-col mb-2 ml-4 mt-1">
                        <div class="text-gray-600 text-sm font-semibold">Sara Lauren</div>
                        <div class="flex w-full mt-1">
                            <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                                UX Design
                            </div> 
                            <div class="text-gray-400 font-thin text-xs">
                                • 1 day ago
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-b border-gray-100"></div> 
                <div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                    <img class="rounded w-full" src="https://picsum.photos/536/354">
                </div>
                <div class="text-gray-600 font-semibold  mb-2 mx-3 px-2">Dummy text of the printing and typesetting industry</div>
                <div class="text-gray-500 text-sm mb-6 mx-3 px-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</div>
                <div class="flex justify-start mb-4 border-t border-gray-100">
                    <div class="flex w-full mt-1 pt-2 pl-5">
                        <span class="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                        </span>
                        <img class="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
                        <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="">
                        <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80" alt="">
                        <img class="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80" alt="">
                    </div>
                    <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                        <span class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                            </svg>
                        </span>
                        <span class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                            <svg class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="flex w-full border-t border-gray-100">
                    <div class="mt-3 mx-5 flex flex-row text-xs">
                        <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Comments:<div class="ml-1 text-gray-400 text-ms"> 30</div></div>
                        <div class="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Views: <div class="ml-1 text-gray-400 text-ms"> 60k</div></div>
                    </div>
                    <div class="mt-3 mx-5 w-full flex justify-end text-xs">
                        <div class="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes: <div class="ml-1 text-gray-400 text-ms"> 120k</div></div>
                    </div>
                </div>
                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                    <img class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80">
                    <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                        <button type="submit" class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                        <svg class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>

                        </button>
                    </span>
                     <input type="search" class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style="border-radius: 25px" placeholder="Post a comment..." autocomplete="off">
                </div>
            </div>

    </article>
    
</main>

</div>



</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
  components: {

  },
  data() {
    return {
      status_appover: "",
      isLoading: false,
      userData: {},
      modal1Element: null,
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    handleLoginButtonClick() {
      if (this.status_appover === 'รออนุมัติ') {
        this.showLoginNotAllowedMessage();
      } else if (this.status_appover === 'ยังกรอกข้อมูลไม่ครบ') {
        this.openModal1();
      } else if (this.status_appover === 'ได้รับการอนุมัติแล้ว') {
        this.showSuccessMessageAndNavigate();
      } else {
      }
    },

    showLoginNotAllowedMessage() {
      Swal.fire({
        icon: 'info',
        title: 'ไม่สามารถเข้าสู่ระบบได้',
        text: 'โปรดรอแอดมินอนุมัติ',
      });
    },

    showSuccessMessageAndNavigate() {
  Swal.fire({
    icon: 'success',
    text: 'Redirecting to Login...',
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    // Logout and navigate to login page
    this.logout();
  });
},


    async loadUserData() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${process.env.VUE_APP_API}/partner/me`, {
          headers: {
            "token": localStorage.getItem('token'),
          },
        });
        this.status_appover = response.data.data.status_appover;

   
        this.userData = response.data.data; // กำหนดค่า userData

        console.log("ข้อมูลพาร์ทเนอร์", response.data.data);


      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },


    async confirmLogout() {
      const confirmResult = await Swal.fire({
        text: 'คุณต้องการออกจากระบบหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ออกจากระบบ',
        confirmButtonColor: '#E0144C',
        cancelButtonText: 'ยกเลิก',
      });

      if (confirmResult.isConfirmed) {
        this.logout();
      }
    },

    logout() {
      localStorage.clear();
      this.$store.commit("setLoginDefault");
      this.$router.push("/");


    },
  },
};
</script>

  

<style scoped>
.modal-box {
  max-width: 48rem;
  background-color: #FFD1DA;
  z-index: 0;
}
</style>

<style>
div:where(.swal2-container) {
  z-index: 9000;
}
</style>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
