
        
    
       async function states(){
           const responseData = await fetch('./states.json');
           const statesData = await responseData.json();
           console.log(statesData);
           const length = statesData.states.length;
           let selectState = document.querySelector('select');
           
           for(i = 0; i < length; i++){
               let opt = document.createElement('option');
               opt.value = statesData.states[i].state_id;
               opt.appendChild(document.createTextNode(`${statesData.states[i].state_name}`))
               selectState.appendChild(opt);              
           }
       }
       states();
       //selectors 
       document.querySelector('button').addEventListener('click', handleSelectForm);
        function handleSelectForm(e){
            e.preventDefault();
           selected = document.querySelector('select');
           content = document.getElementById("main");
           content.innerHTML = ``;
           getData(selected.value);
       }

       async function getData(state){
        const responseData = await fetch('./states.json');
           const statesData = await responseData.json();
           let index = 0;
           const length = statesData.states.length;
           for(z = 0; z < length; z++){
               if(statesData.states[z].state_id == state){
                   index = z;
               } //add error message
           }
           
           // specific district 
           state = index;
           const len = statesData.states[index].state_districts.length;
           for(k=0; k < len ;k++){
            let district = statesData.states[index].state_districts[k];
            let apiUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=12-05-2021`;
           const response = await fetch(apiUrl);
           const data = await response.json();
           addData(data); 
           }
                               
       }
      
       function addData(data){

        const length = data.sessions.length;
           for(i = 0; i < length; i++){
            console.log(data.sessions[i]);
            let hosp = data.sessions[i].name;
            let address = data.sessions[i].address;
            let available = data.sessions[i].available_capacity; 
            let li = document.createElement('li');
            body = document.getElementById('main');
            li.innerHTML = `Hospital ${hosp} : , Address: ${address}, Available : ${available}`;
            body.appendChild(li);
           }
       }
       

       

       //today's date. Obtained from stackoverflow 
       var today = new Date();
       var dd = String(today.getDate()).padStart(2, '0');
       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
       var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

       
        
       /**async function getDistricts(){
           const responseDataD = await fetch('./districts.json');
           const districtData = await responseDataD.json();
           console.log(districtData);
        
       }
       getDistricts();
       
      
       async function getD(){
        
           for(i = 1; i  < 38; i++){
           const apiUrld = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${i}`;        
           
           let responsed = await fetch(apiUrld);
           let datad = await responsed.json();
           let length = datad.districts.length;
           
            let body = document.querySelector('body');
            let p = document.createElement('i');
            p.innerHTML = `${i}:`
            body.appendChild(p)
            console.log(length);
            
           for(j = 0; j < length; j++){
            let p = document.createElement('b');            
            p.innerHTML = ` ${datad.districts[j].district_id}, `;
            body.appendChild(p);
           } 

           body.appendChild(document.createElement('br'));                    
       }
    }
       getD();
       **/
    // 