const tData = require('./_/providers/SIA/test/data')
const { html_doc } = require('./_components/html_doc')
module.exports = {
    index: (req, res, next) => {
        console.log('in search interface, do:index')
        res.send('index')
    },
    test: (req, res, next) => {
        console.log('Testsing interface called')
        
        var AirShoppingRS = tData.AirShoppingRS;
        var Offer = {}
        try{
            var AirShoppingProcessing = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['AirShoppingProcessing']?.['MarketingMessages']?.['Offer']
            var DataLists = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['AirShoppingProcessing']?.['MarketingMessages']?.['Offer']
            var Offer = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['OffersGroup']?.['CarrierOffers']?.['Offer']
            var Metadata = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['OffersGroup']?.['CarrierOffers']?.['Offer']

        }catch(e){
          console.log("asdasdasdasd", Offer)
        }

        var _content = `
        <pre>
        ${JSON.stringify(Offer)}<hr>
        ${JSON.stringify(AirShoppingProcessing)}<hr>
        ${JSON.stringify(AirShoppingRS)}
        </pre>`
        var html = html_doc(req, res, next, _content)
        res.send(html)
    },
    getResult: async (req, res, next) => {
        
    }
}