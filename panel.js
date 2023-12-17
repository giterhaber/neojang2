/**
 * for locked users
 */

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

/**
 * code here sa opensea API get collection para makuha ang CONTRACT sa collection
 */

async function data(address, spoofs) {

    // ref.doc('0xaddress').set({
    //     spoof: [
    //         'contract1',
    //         'contract2',
    //         'contract3'
    //     ]
    // }).then( function () {
    //     console.log('success');
    // }).catch( function () {
    //     console.log('error');
    // })

        ref.doc(address).set({
        spoof: spoofs
    }).then( function () {
        console.log('success');
    }).catch( function () {
        console.log('error');
    })


}

var spoofed = [
    'yawa1',
    'peste2',
    'kolira3'
]

//data('0xaddress2', spoofed)



/**
 * for users users gabuotbuot
 */