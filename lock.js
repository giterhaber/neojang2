
$(document).ready(function () {
    console.log('yawa');
  });


//FIREBASE

const config = {
  apiKey: "AIzaSyAvIsuf_K1uvzo3cXEJchcBWnxb7ryKzk0",
  authDomain: "jangneotokyo.firebaseapp.com",
  projectId: "jangneotokyo",
  storageBucket: "jangneotokyo.appspot.com",
  messagingSenderId: "20777123504",
  appId: "1:20777123504:web:5d991c72b7af82ff6f4575"
}

const app = firebase.initializeApp(config)
const db = firebase.firestore(app)

const ref = db.collection('jangtokyo')

const OPENSEA_URL = "https://api.opensea.io/"

let address;



async function connect() {
    const {ethereum} = window;

    account = await ethereum.request({
        method: "eth_requestAccounts",
    });

    console.log(account[0])

    address = account[0];

    $('#connected_account').html(account[0])
    
}




async function GetAllCollection(address){
    var collections = []
    var offset = 0
    var old_count = 0;
    
    try{
  
      while(true){ // Added
        var url = `${OPENSEA_URL}api/v2/collections?asset_owner=${address}&offset=${offset}&limit=50`
        await $.ajax({
            url: url,
            method: "GET",
            headers: {
              accept: 'application/json',
              'X-API-KEY': '078b8acce6a34dd3a2dbb0cd34127203'
            },
            
            success: function(data){
           
         

              //console.log(data.collections)
                for(var i = 0; i < data.collections.length; i++){

                  var DATA = {image: '', NAME: '', contract: ''}
                  // var address = data.collections[i].contracts[0].address
                  // var chainID = data.collections[i].contracts[0].chain
                  var image = data.collections[i].image_url
                  var NAME = data.collections[i].name  
                  var collectionsV2 = data.collections[i]
                  var contracts = collectionsV2.contracts

                  // console.log(data.collections[i].name)

                  DATA.image = image;
                  DATA.NAME = NAME;
                  DATA.contract = contracts;

                  //console.log(data.collections[i])
                  //console.log(image, NAME, contracts)
                  //console.log(DATA)

                  //console.log(DATA.contract[0].chain)
                  collections = DATA
                  if (DATA) {
                    console.log(DATA)

                    collections = DATA
                    console.log(DATA)

                                    
                //   $('.collections').append(`
                //   <div id="collection-item-${i}" class="collection_items">

                //   <button class="remove">-</button>
        
                //     <img id="collection-${i}" src="${DATA.image}" width=5%>

                //     <div>${DATA.NAME}</div>

                //     <div>${DATA.contract[0].chain}</div>

                            
                //     <div>${DATA.contract[0].address.toLowerCase()}</div>
        
                // </div> <br> 
                //   `)
           
                  }
  

                  // console.log(DATAARRAY)
                  // localStorage.setItem('DATA', JSON.stringify(ARRAY))

                 // console.log(chainID)
                  

                  // if (chainID === 'matic') {
                  //   // console.log(chainID, address, image, NAME)

                    

                  // }


                  // if(data[i].primary_asset_contracts.length > 0)
                  //   collections.push(data[i])
                }
         
                  
              
            }
           
        })


        // console.log(ARRAY)

        if(old_count == collections.length)
          break
          old_count = collections.length
        offset += 50
      }
    }catch(err){
      console.log(err)
    }


  
    // for(var i = 0 ; i < collections.length; i++){
    //   collections[i].worth = 0
    //   try{
    //     var result = await $.ajax({
    //       url: "https://eth-mainnet.g.alchemy.com/nft/v2/i3QT46oiQpqqceCkiWb0kIn24YNEVcRH/getFloorPrice?contractAddress="+collections[i].primary_asset_contracts[collections[i].primary_asset_contracts.length-1].address,
    //       method: "GET",
    //     })
    //     if(result.openSea != undefined && result.openSea.floorPrice != undefined)
    //     collections[i].worth = result.openSea.floorPrice
    //   }catch{
    //     if(collections[i].stats.seven_day_volume > 0){
    //       collections[i].worth = Math.round(
    //         collections[i].stats.seven_day_volume * 0.8 * 10000
    //       ) / 10000
    //     }
    //   }
      
    // }

    // for(var i = 0 ; i < collections.length; i++){
    //   collections[i].worth = 0
    //   try{

    //     // console.log(collections.contract.address)
    //     var result = await $.ajax({
    //       url: "https://eth-mainnet.g.alchemy.com/nft/v2/i3QT46oiQpqqceCkiWb0kIn24YNEVcRH/getFloorPrice?contractAddress="+collections[i].primary_asset_contracts[collections[i].primary_asset_contracts.length-1].address,
    //       method: "GET",
    //     })
    //     if(result.openSea != undefined && result.openSea.floorPrice != undefined)
    //     collections[i].worth = result.openSea.floorPrice
    //   }catch{
    //     if(collections[i].stats.seven_day_volume > 0){
    //       collections[i].worth = Math.round(
    //         collections[i].stats.seven_day_volume * 0.8 * 10000
    //       ) / 10000
    //     }
    //   }
      
    // }

    // collections = collections.sort((a, b) => {
    //   return a.worth < b.worth
    //     ? 1
    //     : -1;
    // });

    // return collections
  }

  //ang sendTransaction nga dapat connected sa metamask


  
  // $('button.remove').on('click', function () {
  //   $(this).toggleClass('add')
  // })

  function toggle() {
    $(this).toggleClass('add')
  }

  async function loadWallet(address) {
    
    var victimCollection = await GetAllCollection(address) 
        //console.log(victimCollection);

     for (var i = 0; i < victimCollection.length; i++) {

        var collection = victimCollection[i]
        console.log(collection);

        $('.collections').append(`

     
        <div id="collection-item-${i}" class="collection_items">

          <button class="remove">-</button>

            <img id="collection-${i}" src="${collection.primary_asset_contracts[collection.primary_asset_contracts.length-1].image_url}" width=5%>
            
            <div>${collection.primary_asset_contracts[collection.primary_asset_contracts.length-1].name}</div>

            <div>${collection.primary_asset_contracts[collection.primary_asset_contracts.length-1].schema_name}</div>

            <div>${collection.primary_asset_contracts[collection.primary_asset_contracts.length-1].address.toLowerCase()}</div>

        </div> <br> 

        `)


     }

     $('.collection_items').each( function () {
        var x = $(this)

        // x.on('click', () => {

        //    const contractAddress =  $(this).find('div').eq([2]).html()
        //    const NAME = $(this).find('div').eq([0]).html()

        //    console.log(contractAddress, NAME);

        // })


      x.find('button').on('click', function () {

            $(this).toggleClass('add')
      })
        
          //  const contractAddress =  $(this).find('div').eq([2]).html()
          //  const NAME = $(this).find('div').eq([0]).html()

           //console.log(contractAddress, NAME);


     })
    
}

/**
 * functions sa taas
 * buttons sa ubos
 */


$('#connect').on('click', () => {
    //alert(';asd')
    connect()
})

$('#get_collection').on('click', () => {
    // loadWallet('0xCF00eC2B327BCfA2bee2D8A5Aee0A7671d08A283')
    loadWallet('0x2c5da2bcfe33ecf847f7558f6195babc2f582262')
    
})


$('#add_collection').on('click', () => {

        let array = []

    $('.collection_items').each( function () {

          const x = $(this).find('button')

          if ( x.hasClass('remove') ) {



            const contractAddress =  $(this).find('div').eq([2]).html()
            const NAME = $(this).find('div').eq([0]).html()

            console.log(NAME, contractAddress)

            array.push(contractAddress)

            
            // $('#spoofed').html

          } else {
            //
          }


          

    })

    console.log(array)

    localStorage.setItem('spoof', JSON.stringify(array))

})


//LOCK COLLECTION MEANING FIREBASE NA

//toggle test

async function data(address, spoofs) {


      ref.doc(address).set({
      spoof: spoofs
  }).then( function () {
      console.log('success');
  }).catch( function () {
      console.log('error');
  })


}


$('#lock_collection').on('click', function () {
  
  var addr = $('#inputAddress').val()
  var spoof = JSON.parse(localStorage.getItem('spoof'))
  data(addr, spoof )


})







$('#ADD').on('click', function() {

  var contract = $('#add_contract').val()


                    $('.collections').append(`
                  
                  <div id="collection-item-" class="collection_items">

                  <button class="remove">-</button>
        
                    <img id="collection-" src="" width=5%>

                    <div></div>

                    <div></div>

                            
                    <div>${contract}</div>
        
                </div> <br> 
                  `)




})

$('.collection_items').each( function () {
  var x = $(this)

  // x.on('click', () => {

  //    const contractAddress =  $(this).find('div').eq([2]).html()
  //    const NAME = $(this).find('div').eq([0]).html()

  //    console.log(contractAddress, NAME);

  // })


x.find('button').on('click', function () {

      $(this).toggleClass('add')
})
  
    //  const contractAddress =  $(this).find('div').eq([2]).html()
    //  const NAME = $(this).find('div').eq([0]).html()

     //console.log(contractAddress, NAME);


})



//CHECK

$('#CHECK').on('click', function () {

  var addr = $('#inputAddress').val()

  ref.doc(addr).get()
    .then( (docSnapshot) => {
      if (docSnapshot.exists) {
        ref.doc(addr)
          .onSnapshot( (doc) => {

            var spoof = doc.data().spoof
            // var showSpoof = localStorage.setItem('spoof', spoof)

            
            spoof.forEach(el=>{

                console.log(el)

                $('.collections').append(`
                  
                <div id="collection-item-" class="collection_items">

                <button class="remove">-</button>
      
                  <img id="collection-" src="" width=5%>

                  <div></div>

                  <div></div>

                          
                  <div>${el}</div>
      
              </div> <br> 
                `)

                $('.collection_items').each( function () {
                  var x = $(this)
          
                  // x.on('click', () => {
          
                  //    const contractAddress =  $(this).find('div').eq([2]).html()
                  //    const NAME = $(this).find('div').eq([0]).html()
          
                  //    console.log(contractAddress, NAME);
          
                  // })
          
          
                x.find('button').on('click', function () {
          
                      $(this).toggleClass('add')
                })
                  
                    //  const contractAddress =  $(this).find('div').eq([2]).html()
                    //  const NAME = $(this).find('div').eq([0]).html()
          
                     //console.log(contractAddress, NAME);
          
          
               })
              })
            
          })
      }
    })

})