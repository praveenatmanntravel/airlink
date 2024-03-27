const { html_doc } = require('./_components/html_doc')
const { ObjectId } = require("mongodb");
const mongodbClient = require('../_helpers/db');

module.exports = {
    index: (req, res, next) => { },
    view: async (req, res, next) => {

        const qry = req.query
        const pnrid = qry.pnrid

        var _content =
            `
        <div class="container-fluid pb-4">

            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Airlink</a></li>
                                <li class="breadcrumb-item"><a class="link-primary text-decoration-underline link-offset-2" href="search.html">Back to List</a></li>
                                <li class="breadcrumb-item active">PNR Details</li>
                            </ol>
                        </div>
                        <h4 class="page-title" id="BookingRef-info" >Loading ... </h4>
                    </div>
                </div>
            </div>
            <!-- end page title -->
            ${req.access}
            <!-- start message/alert -->
            <div class="row">
                <div class="col-lg-9">
                    <div class="alert alert-success alert-dismissible text-bg-success border-0 fade show" role="alert">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                        PNR details added successfully.
                    </div>
                </div>
            </div>

            <!-- Start Content -->
            <div class="row">
                <div class="col-12 col-md-9" id="pnr_view_content" >
                    
                    <div class="text-end pe-1 mb-1">
                        
                    </div>
                    <div class="selected_flight-info " id="PaxJourneyList-info" ></div>
                    <div class="selected_flight-info " id="PaxList-info" ></div>
                    <div class="selected_flight-info " id="TicketDoc-info" ></div>
                    <div class="selected_flight-info " id="ContactInfoList-info" ></div>
                    <div class="selected_flight-info " id="OrderStatus-info" ></div>
                    <div class=" " id="AfterTicket-Actions" ></div>
                    
                </div>

                <!-- Start Price Info -->
                <div class="col-12 col-md-3">
                    <div class="sticky-top-sec">
                        <div class="totalfare-sec shadow">
                            <ul class="totalfare-ul list-group list-group-flush p-2" id="price-info" > </ul>
                            <ul class="list-unstyled px-2 pb-3">
                                <li>
                                    <i class="mdi mdi-chevron-right mdi-18px pe-1"></i>
                                    <a type="button" class="text-decoration-underline link-offset-2" data-bs-toggle="modal" data-bs-target="#fareRuleModel" provider="ndcSIA" >Full fare rules and conditions</a></li>
                            </ul>
                        </div>
                        <div class="history-log shadow" id="Activity-info" > </div>

                        <!--
                        <div class="share-ticket-block">
                            <span><i class="uil uil-share-alt"></i> Share Itinerary:</span>
                            <a type="button" class="px-1 align-middle shareItinerary" data-bs-toggle="popover" data-bs-placement="bottom" tabindex="0" data-bs-content="Share Itinerary" data-bs-title="Share Itinerary"><i class="mdi mdi-message-text-outline mdi-18px"></i></a>
                            <a type="button" class="px-1 align-middle shareItinerary" data-bs-toggle="popover" data-bs-placement="bottom" tabindex="0" data-bs-content="Share Itinerary" data-bs-title="Share Itinerary"><i class="mdi mdi-email-outline mdi-18px"></i></a>
                            <a type="button" class="px-1 align-middle shareItinerary" data-bs-toggle="popover" data-bs-placement="bottom" tabindex="0" data-bs-content="Share Itinerary" data-bs-title="Share Itinerary"><i class="mdi mdi-whatsapp mdi-18px"></i></a>
                        </div>
                        <div class="action-div mt-2">
                            <button type="button" class="btn btn-primary w-100" onClick="document.getElementById('create-pnr-form').submit()">Create PNR</button>
                        </div>
                        -->
                    </div>
                </div>
                <!-- End Price Info -->

            </div>
            <!-- end Content -->
        </div>


        <!-- Flight detail popup -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="flightDetailOffcanvas" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header pb-0">
                <h3 class="offcanvasRightLabel fw-semibold">Flight Details</h3>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body p-0">
            </div>
        </div>
        
        <!-- Farerules popup Modal -->
        <div class="modal fade" id="fareRuleModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="fareRuleModelLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="fareRuleModelLabel">Fare Detail</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div>
                </div>
            </div>
        </div>
            
        <script src="/js/search/common.js"></script>
        <script src="/js/search/travelport.js"></script>
        <script src="/js/search/ndcSIA.js"></script>
        <script>
            fetchForPNRView('${pnrid}')
        </script>
           `
        var html = html_doc(req, res, next, _content)
        res.send(html)
    },
    dataForPnrView: async (req, res, next) => {
        const pnrid = req.body?.pnrid
        const pnrdetails = await mongodbClient.db('Airlink').collection('pnrs').findOne({ _id: new ObjectId(pnrid) })
        console.log('pnrdetails', pnrdetails)
        return res.json({'pnrdetails': pnrdetails, provider: 'ndcSIA', 'user_access': req.access});
    },
    PnrActivityLog: async (req, res, next) => {
        const pnrid = req.body?.pnrid
        const activityLogs = await mongodbClient.db('Airlink').collection('activity_log').find({ pnr_id: new ObjectId(pnrid) }).toArray()
        console.log('activityLogs', activityLogs)
        return res.json(activityLogs);
    },
    action: async (req, res, next) => {

        const pnrid = req.body?.pnrid
        const pnrdetails = await mongodbClient.db('Airlink').collection('pnrs').findOne({ _id: new ObjectId(pnrid) })
        req.pnrdetails = pnrdetails
        var tp_res
        if (pnrdetails?.provider == 'ndcSIA') {

            const SIA = require('./_/providers/SIA/index.js')
            tp_res = await SIA[`${req?.body?.do || req?.query?.do || 'index'}`](req, res, next);

        } else if (pnrdetails?.provider == 'travelport') {


        }

        return res.json(tp_res)
    },
    test: (req, res, next) => {
        console.log('Testsing interface called')

        var AirShoppingRS = tData.AirShoppingRS;
        var Offer = {}
        try {
            var AirShoppingProcessing = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['AirShoppingProcessing']?.['MarketingMessages']?.['Offer']
            var DataLists = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['AirShoppingProcessing']?.['MarketingMessages']?.['Offer']
            var Offer = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['OffersGroup']?.['CarrierOffers']?.['Offer']
            var Metadata = AirShoppingRS?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['OffersGroup']?.['CarrierOffers']?.['Offer']

        } catch (e) {
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
        res.send('asa')
    }
}