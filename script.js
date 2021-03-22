var  Home_page = {
    template:'#home_page',
    data() {
        return {
            cname:user_url,
            log_status:'Log out'
        }
    },
    methods: {
        logout_evt(){
            const register_data = {
                S_Account:username_chk
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != null){
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                    router.push('/login')
            }
        },
    },
}
var username_chk = window.sessionStorage.getItem("user_chk",JSON.stringify(Object));
var user_url = window.sessionStorage.getItem("user_url",JSON.stringify(Object));
var Login_page = {
    template:"#login_page",
    data() {
        return {
            S_Account:'b10702130@mail.ntust.edu.tw',
            S_Password:'wendy890807',
            cname:user_url,
        }
    },
    methods:{
        logout_evt(){
            
            const register_data = {
                S_Account:username_chk,
                
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                router.push('/login');
                setTimeout(function(){location.reload()},500);
            }).catch(err=>{
                console.log(err);
            })
        },
        login_evt(){
            const register_data = {
                S_Account:this.S_Account,
                S_Password:this.S_Password,
            };
            axios.post('http://122.116.217.115:6150/User/Login/V1',register_data)
            .then(response=>{
                let data = response.data;
                console.log(data[0].S_Username);
                window.sessionStorage.setItem("user_chk",this.S_Account);
                window.sessionStorage.setItem("user_url",data[0].S_Username);
                router.push('/');
                setTimeout(function(){location.reload()},500);
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
        // setCookie(cname,cvalue,exdays){
        //     var d = new Date();
        //     d.setTime(d.getTime()+(exdays*24*60*60*1000));
        //     var expires = "expires="+d.toGMTString();
        //     document.cookie = cname+"="+cvalue+"; "+expires;
        // },
        // getCookies(cname){
        //     var name = cname + "=";
        //     var ca = document.cookie.split(';');
        //     for(var i=0;i<ca.length;i++){
        //         var c = ca[i].trim();
        //         if(c.indexOf(name)==0){
        //             return c.substring(name.length,c.length);
        //         }
        //     }
        // },
    },
}
var user_new = window.sessionStorage.getItem("user_new",JSON.stringify(Object));
var Register_page = {
    template:"#register_page",
    data(){
        return{
            S_First_Name:'ting-wan',
            S_Last_Name:'haung',
            S_Account:'b10702206@mail.ntust.edu.tw',
            rules: [
                { message: "One lowercase letter required.", regex: /[a-z]+/ },
                { message: "One uppercase letter required.", regex: /[A-Z]+/ },
                { message: "8 characters minimum.", regex: /.{8,}/ },
                { message: "One number required.", regex: /[0-9]+/ }],
          
                S_Password: "Wendy890807!",
                S_Repassword: "Wendy890807!",
                passwordVisible: false,
                submitted: false ,
                test:null,
                cname:user_url,
        }
    },
    
    methods: {
        
        logout_evt(){
            const register_data = {
                S_Account:username_chk
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
        resetPasswords() {
            this.S_Password = "";
            this.S_Repassword = "";
            this.submitted = true;
            setTimeout(() => {
                this.submitted = false;
            }, 2000);
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        }, 
        continue_register(){
            axios.post('http://122.116.217.115:6150/User/Register/V1',{
                S_First_Name:this.S_First_Name,
                S_Last_Name:this.S_Last_Name,
                S_Account:this.S_Account,
                S_Password:this.S_Password,
                S_Repassword:this.S_Repassword,
            })
            .then(response=>{
                let data = response.data
                console.log(data);
                window.sessionStorage.setItem("user_new",this.S_Account);
                router.push('/userset');
            }).catch(err=>{
                console.log(err);
            })

            
        },
    },
    computed: {
        notSamePasswords() {
          if (this.passwordsFilled) {
            return this.S_Password !== this.S_Repassword;
          } else {
            return false;
          }
        },
        passwordsFilled() {
          return this.S_Password !== "" && this.S_Repassword !== "";
        },
        passwordValidation() {
          let errors = [];
          for (let condition of this.rules) {
            if (!condition.regex.test(this.S_Password)) {
              errors.push(condition.message);
            }
          }
          if (errors.length === 0) {
            return { valid: true, errors };
          } else {
            return { valid: false, errors };
          }
        } }
}

var User_set_page = {
    template:'#user_set_page',
    data() {
        return {
            S_Username:'',
            I_Sex:1,
            D_Birthday:'',
            S_Phone:'',
            S_Company_Name:'',
            S_Company_Address:'',
            S_Verify_Code:'',
            cname:user_new,
        }
    },
    
    methods: {
        logout_evt(){
            const register_data = {
                S_Account:user_new
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
        saveDataToServer:function(){
            var D_Birthday = this.backEndDteFormat(this.D_Birthday);
            if(D_Birthday === "Invalid date"){
                alert("生日格式錯誤");
            }else{
                const register_data = {
                    S_Account:user_new,
                    S_Username:this.S_Username,
                    I_Sex:this.I_Sex,
                    D_Birthday:D_Birthday,
                    S_Phone:this.S_Phone,
                    S_Company_Name:this.S_Company_Name,
                    S_Company_Address:this.S_Company_Address,
                    S_Verify_Code:this.S_Verify_Code,
                };
                axios.post('http://122.116.217.115:6150/User/Verify/V1',register_data)
                .then(response=>{
                    console.log(response);
                    router.push('/');
                }).catch(err=>{
                    console.log(err);
                })
                 
            }
            
        },
        backEndDteFormat:function(D_Birthday){
            return moment(D_Birthday,'YYYY/MM/DD').format('YYYY-MM-DD')
        }

        
    },
}
var Profile_page = {
    template:'#profile_page',
    data() {
        return {
            userInfo:[],
            cname:user_url
        }
    },
    methods: {
        logout_evt(){
            const register_data = {
                S_Account:username_chk
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
    },
    mounted() {
        fetch('http://122.116.217.115:6150/User/Profile/'+user_url+'/V1')
        .then(response => response.json())
        .then(userInfo => {
            this.userInfo = userInfo
            console.log(this.userInfo)
        })
        .catch(function(err){  
            console.log(err);
        })
    },
}
var station_data = Vue.component('station_data', {
    data(){
        return{
            station_lists:[],
            input: {
                S_Station_Name: null,
                S_Station_Id: null
              },
        }
    },
    template: `
          <div class="station_info">
            <div class="info_title">
                <label>案場資訊</label>
                <div id="select_station_list">
                    <select id="station" class="select_option" v-model="input.S_Station_Name">
                        <option :value="null">切換案場</option>
                        <option v-for="item in typeList.sort">{{item}}</option>
                    </select>
                    <select id="windmachine"  class="select_option" v-model="input.S_Station_Id">
                        <option :value="null">選擇風機</option>
                        <option v-for="item in titleList.sort">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="info_content" >
                <div id="info_subcontain">
                    <div class="subtitle">
                        <label>地理資訊</label>
                        <div class="caseInfo"v-if="content">
                            <label>案場名稱:</label>
                            <div class="case_name">
                                {{ content.S_Station_Name }}
                            </div>
                            <label>地址:</label>
                            <div class="case_name">
                                {{ content.S_Station_Road }}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="info_subcontain">
                    <div class="subtitle">
                        <label>能源裝置數量</label>
                        <div class="caseInfo"v-if="content">
                            <label>轉換器數量:</label>
                            <div class="case_name">
                            {{ content.I_Generator_Number }}台
                            </div>
                            <label>閘道器數量:</label>
                            <div class="case_name">
                            {{ content.I_Gateway_Number }}台
                            </div>
                        </div>
                    </div>
                </div>
                <div id="info_subcontain">
                    <div class="subtitle">
                        <label>案場資訊</label>
                        <div class="caseInfo"v-if="content">
                            <label>建置時間:</label>
                            <div class="case_name">
                                {{ content.DT_Station_On }}
                                
                            </div>
                            <label>能源類型:</label>
                            <div class="case_name">
                                {{ content.I_Energy }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    `,
    computed:{
        typeList(){
            let obj = {
                sort:[],
                map:{}
            }
            this.station_lists.forEach(({S_Station_Name, S_Station_Id, S_Station_Road,I_Generator_Number,I_Gateway_Number,I_Energy,DT_Station_On}, index) =>{
                // console.log(S_Station_Name)//undefined
                // console.log(this.station_lists[0][0].S_Station_Name)//桃園
                if(!obj.map[S_Station_Name]){
                    obj.sort.push(S_Station_Name)
                    obj.map[S_Station_Name] = {
                        sort: [],
                        map: {}
                    }
                }
                obj.map[S_Station_Name].sort.push(S_Station_Id)
                obj.map[S_Station_Name].map[S_Station_Id] = {index, S_Station_Name,S_Station_Road,I_Generator_Number,I_Gateway_Number,I_Energy,DT_Station_On}
            })
            return obj
        },
        titleList(){
            this.input.S_Station_Id = null
            if(this.input.S_Station_Name){
                return this.typeList.map[this.input.S_Station_Name]
            }else{
                return []
            }
        },
        content(){
            if(this.input.S_Station_Id){
                return this.titleList.map[this.input.S_Station_Id]
            }else{
                return null
            }
        }
    },
    mounted() {
        fetch('http://122.116.217.115:6150/Station/List/york/V1')
        .then(response => response.json())
        .then(station_lists => {
            this.station_lists = station_lists
            console.log(this.station_lists)
        })
        .catch(function(err){  
            console.log(err);
        })
    },
})
var machine_apply = Vue.component('machine_apply', {
    data() {
        return {
            module_spec:'',
            create_time:'',
            inverter:'',
            architecture_design:'',
            station_lists:[],
            input: {
                S_Station_Name: null,
                S_Station_Id: null
              },
        }
    },
    template: `
    <div class="station_info">
    <div class="info_title">
        <label>風機設備申請</label>
        <div id="select_station_list">
            <select id="station" class="select_option" v-model="input.S_Station_Name">
                <option :value="null">切換案場</option>
                <option v-for="item in typeList.sort">{{item}}</option>
            </select>
            <select id="windmachine"  class="select_option" v-model="input.S_Station_Id">
                <option :value="null">選擇風機</option>
                <option v-for="item in titleList.sort">{{item}}</option>
            </select>
        </div>
    </div>
    <div class="info_content">
        <div id="info_subcontain">
            <div class="subtitle">
                <label>地理資訊</label>
                <div class="caseInfo"v-if="content">
                    <label>案場名稱:</label>
                    <div class="case_name">
                        {{ content.S_Station_Name }}
                    </div>
                    <label>地址:</label>
                    <div class="case_name">
                        {{ content.S_Station_Road }}
                    </div>
                </div>
            </div>
        </div>
        <div id="info_subcontain">
            <div class="subtitle">
                <label>風機模組規格</label>
                <div class="caseInfo"v-if="content">
                    <label>架構設計:</label>
                    <div class="case_name">
                        <input type="text" class="station_input" placeholder="地面型支撐架" v-model="architecture_design">
                    </div>
                    <label>模組規格:</label>
                    <div class="case_name">
                    <input type="text" class="station_input" placeholder="同昱GTEC-305G6S6A" v-model="module_spec">
                    </div>
                </div>
            </div>
        </div>
        <div id="info_subcontain">
            <div class="subtitle">
                <label>案場資訊</label>
                <div class="caseInfo"v-if="content">
                    <label>建置時間:</label>
                    <div class="case_name">
                    <input type="date" class="station_input" placeholder="2018-12-10" v-model="create_time">
                    </div>
                    <label>裝置數量:</label>
                    <div class="case_name">
                        <input type="number" class="inverter_count" placeholder="68" min="0" v-model="inverter">台
                        <button id="station_apply_btn" @click="apply_station()">申請</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  </div>
    `
    ,
    methods: {
        apply_station(){
            const register_station = {
                architecture_design:this.architecture_design,
                module_spec:this.module_spec,
                create_time:this.create_time,
                inverter:this.inverter,
            };
            axios.post('http://122.116.217.115:6150/Station/Register/V1',register_station)
            .then(response=>{
                console.log(response);
                alert("已送出");
            }).catch(err=>{
                console.log(err);
                
            })
        }
    },
    computed:{
        typeList(){
            let obj = {
                sort:[],
                map:{}
            }
            this.station_lists.forEach(({S_Station_Name, S_Station_Id,S_Station_Road}, index) =>{
                if(!obj.map[S_Station_Name]){
                    obj.sort.push(S_Station_Name)
                    obj.map[S_Station_Name] = {
                        sort: [],
                        map: {}
                    }
                }
                obj.map[S_Station_Name].sort.push(S_Station_Id)
                obj.map[S_Station_Name].map[S_Station_Id] = {index, S_Station_Name,S_Station_Road}
            })
            return obj
        },
        titleList(){
            this.input.S_Station_Id = null
            if(this.input.S_Station_Name){
                return this.typeList.map[this.input.S_Station_Name]
            }else{
                return []
            }
        },
        content(){
            if(this.input.S_Station_Id){
                return this.titleList.map[this.input.S_Station_Id]
            }else{
                return null
            }
        }
    },
    mounted() {
        fetch('http://122.116.217.115:6150/Station/List/york/V1')
        .then(response => response.json())
        .then(station_lists => {
            this.station_lists = station_lists
            console.log(this.station_lists)
        })
        .catch(function(err){  
            console.log(err);
        })
    },
})
var Station_apply_page = {
    template:'#station_apply_page',
    data(){
        return {
            cname:user_url
        }
    },
    methods: {
        logout_evt(){
            const register_data = {
                S_Account:username_chk
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
        
    },
}
var Station_list = {
    template:'#station_list',
    data() {
        return {
            station_content:'station_data',
            cname:user_url,
        }
    },
    
    methods: {
        logout_evt(){
            const register_data = {
                S_Account:username_chk
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
        
    },
}
var abnormal = Vue.component('abnormal', {
    template: `
        <table class="abnormal" id="abnormal">
            <tr>
                <th>序號</th>
                <th>日期/時間</th>
                <th>項目</th>
                <th>告警代碼</th>
                <th>描述</th>
            </tr>
            <tr>
                <td>1</td>
                <td>2021/01/25 00:44:38</td>
                <td>INV</td>
                <td>01</td>
                <td>逆變器溫度過高</td>
            </tr>
        </table>    
    `,
})

var real_time = Vue.component('real_time', {
    template: `
        <table class="abnormal" id="real_time">
            <tr>
                <th>序號</th>
            </tr>
            <tr>
                <td>Real time</td>
            </tr>
        </table>    
    `
})
var report_table = Vue.component('report_table',{
    template:`
        <table class="abnormal" id="report_table">
            <tr>
                <th>序號</th>
            </tr>
            <tr>
                <td>Report table</td>
            </tr>
        </table>   
    `
})
var historical = Vue.component('historical', {
    template: `
        <table class="abnormal" id="historical">
            <tr>
                <th>序號</th>
            </tr>
            <tr>
                <td>Historical</td>
            </tr>
        </table>   
    `
})

var Monitor_page = {
    template:'#monitor_page',
    data(){
        return {
            cname:user_url,
            station_lists:[],
            content: 'abnormal',
            input: {
                S_Station_Name: null,
                S_Station_Id: null
              },
        }
    },
    mounted(){
        fetch('http://122.116.217.115:6150/Station/Choose/york/V1')
        .then(response => response.json())
        .then(station_lists => {
                this.station_lists = station_lists;
        })
        .catch(function(err){  
            console.log(err);
        })
    },
    computed:{
        typeList(){
            let obj = {
                sort:[],
                map:{}
            }
            this.station_lists.forEach(({S_Station_Name,S_Station_Id}, index) =>{
                if(!obj.map[S_Station_Name]){
                    obj.sort.push(S_Station_Name)
                    obj.map[S_Station_Name] = {
                        sort: [],
                        map: {}
                    }
                }
                obj.map[S_Station_Name].sort.push(S_Station_Id)
                obj.map[S_Station_Name].map[S_Station_Id] = {index,S_Station_Name, S_Station_Id}
            })
            return obj
        },
        titleList(){
            this.input.S_Station_Id = null
            if(this.input.S_Station_Name){
                return this.typeList.map[this.input.S_Station_Name]
            }else{
                return []
            }
        },
        content(){
            if(this.input.S_Station_Id){
                return this.titleList.map[this.input.S_Station_Id]
            }else{
                return null
            }
        }
    },
    methods:{
        logout_evt(){
            const register_data = {
                S_Account:username_chk
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
        xls_event(){
            $('#' + this.content).table2excel({
                exclude:".noExl",
                name:"Abnormal Report"
            });                                                     
        },
    } 
}
var Setup_page = {
    template:'#setup_page',
    data(){
        return {
            cname:user_url,
            todos: [
                { task: "LEARN VUE.JS", done: true },
                { task: "??????", done: false },
                { task: "PROFIT", done: false }
              ],
              newtodo: ""
        }
    },
    methods: {
        logout_evt(){
            const register_data = {
                S_Account:username_chk
            };
            axios.post('http://122.116.217.115:6150/User/Logout/V1',register_data)
            .then(response=>{
                console.log(response);
                window.sessionStorage.removeItem("user_chk")
                setTimeout(function(){location.reload()},500);
                router.push('/login');
            }).catch(err=>{
                console.log(err);
            })
        },
        pop_little_window(){
            console.log(username_chk)
            if(username_chk != "" || username_chk != null){ 
                var pop = document.getElementById("pop_profile");
                if(pop.style.visibility === "hidden"){
                    pop.style.visibility = "visible"
                }else{
                    pop.style.visibility = "hidden";
                }
            }else{
                router.push('/login')
            }
        },
        addTodo() {
            if (this.newtodo) {
              this.todos.push({
                task: this.newtodo.toUpperCase(),
                done: false
              });
              this.newtodo = "";
            }
          },
          reverseList() {
            this.todos.reverse();
          },
          removeTodo(todo) {
            let i = this.todos.indexOf(todo);
            this.todos.splice(i, 1);
          },
          editTodo(todo) {
            let newText = document.activeElement.textContent.toUpperCase();
            document.activeElement.blur();
            let i = this.todos.indexOf(todo);
            this.todos[i].task = newText;
          },
          clearList() {
            this.todos = [];
          },
          selectAll: function() {
            //targetValue is set to the opposite of areAllSelected
            var targetValue = this.areAllSelected ? false : true;
            //we use a for loop to set the checked state of all items to the target value
            for (var i = 0; i < this.todos.length; i++) {
              this.todos[i].done = targetValue;
            }
          },
    },
    computed: {
        areAllSelected: function() {
          //Check if every checked property returns true and if there is at least one to-do item
          return (
            this.todos.every(function(item) {
              return item.done;
            }) && this.todos.length > 0
          );
        }
      }
}


const routes = [
    {path: '/',component: Home_page},
    {path: '/login',component: Login_page},
    {path: '/register',component: Register_page},
    {path: '/userset',component: User_set_page},
    {path: '/monitor',component: Monitor_page},
    {path: '/station_list',component: Station_list},
    {path: '/setup_page',component: Setup_page},
    {path: '/profile_page',component: Profile_page},
    {path: '/station_apply_page',component: Station_apply_page}
];
var router = new VueRouter({routes});
const vm = new Vue({
    router,
    
}).$mount('#app')

