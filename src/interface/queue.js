const { html_doc } = require('./_components/html_doc')
const { ObjectId } = require("mongodb");
const mongodbClient = require('../_helpers/db');
require('dotenv').config()

module.exports = {
    index: (req, res, next) => { },
    view: async (req, res, next) => {
        console.log(req.params)
        const qry = req.query

        const dates = qry?.dates?.split(" to ") || [];
        const startDate = new Date(dates[0] || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
        const endDate = new Date(dates[1] || new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
        console.log('dates', startDate, endDate, qry)
        
        const pnrs = await mongodbClient.db(process.env.MONGO_DB_DB).collection('pnrs').aggregate(
            [
                {
                    $match: {

                        agency: new ObjectId(req.session.agency._id),
                        //createdAt: { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $project: {
                                    createdBy: "$name",
                                    _id: 0,
                                },
                            },
                        ],
                        as: "agencyUser",
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [
                                "$$ROOT",
                                { $arrayElemAt: ["$agencyUser", 0] },
                            ],
                        },
                    },
                },
                {
                    $project: {
                        agencyUser: 0,
                    },
                }
            ],
            { maxTimeMS: 60000, allowDiskUse: true }
        ).toArray();
        

        var _content =
            `
           <div class="container-fluid">

                        <!-- start page title -->
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box">
                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Airlink</a></li>
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                            <li class="breadcrumb-item active">PNR List</li>
                                        </ol>
                                    </div>
                                    <h3 class="page-title">Queues Tracker</h3>
                                </div>
                            </div>
                        </div>
                        <!-- end page title -->

                        <div class="card mb-3">
                            <div class="card-body">
                                <form action="" method="" >
                                    <fieldset>
                                        <div class="row row-gap-2 align-items-center">
                                            <div class="col-auto">
                                                <div class="form-floating">
                                                    <select class="form-select" name="provider" id="crs" aria-label="crs name">
                                                        <option value="Travelport">Travelport</option>
                                                        <option value="SIA-NDC" selected>SIA-NDC</option>
                                                    </select>
                                                    <label for="crs">Provider</label>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div class="form-floating">
                                                    <select class="form-select" name="queue" id="crs" aria-label="crs name">
                                                        <option value="Quote" >Quote</option>
                                                        <option value="Ticketing">Ticketing</option>
                                                        <option value="Booked">Booked</option>
                                                        <option value="Reissue">Reissue</option>
                                                        <option value="Refund">Refund</option>
                                                        <option value="Cancel">Cancel</option>
                                                    </select>
                                                    <label for="crs">Queue</label>
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control pnrdaterange" name="dates" id="pnr-date-range"  data-toggle="date-picker">
                                                    <label for="pnr-date-range">Select Date Range</span></label>
                                                </div>
                                            </div>
                                            <div class="col-lg-1 d-none">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" name="pnr-number" id="pnr-number" placeholder="" />
                                                    <label for="pnr-number">PNR</label>
                                                </div>
                                            </div>
                                            <div class="col-lg-2 d-none">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" name="pax-name" id="pax-name" placeholder="Enter PAX Name" />
                                                    <label for="pax-name">PAX Name</label>
                                                </div>
                                            </div>
                                            
                                            <div class="col-lg-2 d-none">
                                                <div class="form-floating">
                                                    <select class="form-select" name="type" id="type" aria-label="Ticket Type">
                                                        <option selected>Select Ticket Type</option>
                                                        <option value="Ticketing">Ticketed</option>
                                                        <option value="Not Issued">Not Issued</option>
                                                    </select>
                                                    <label for="type">Ticket Type</label>
                                                </div>
                                            </div>
                                            
                                            <div class="col-lg-2">
                                                <div class="btn-sec ms-auto justify-content-between align-items-center">                             
                                                    <button type="submit" class="btn btn-primary btn-lg ms-auto">
                                                        <i class="mdi mdi-magnify pe-1"></i><span>Search</span> 
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div> <!-- filter end card-->
                        ${JSON.stringify(req.query)}
                        <div class="card">
                            <div class="row card-body">
                                <div class="col-12">
                                    <table id="pnr-table" class="table dt-responsive nowrap table-striped w-100 table-centered">
                                        <thead>
                                            <tr>
                                                <th>Provider</th>
                                                <th>Queue</th>
                                                <th>PNR</th>
                                                <th>Created By</th>
                                                <th>Created At</th>
                                                <th>Remark</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>`


        pnrs?.forEach(function (pnr) {
            _content += `
                                            <tr>
                                                <td>${pnr.provider}</td>
                                                <td>${pnr.queue}</td>
                                                <td>${pnr.pnr}</td>
                                                <td>${pnr.createdBy}</td>
                                                <td>${new Date(pnr.createdAt).toLocaleString("en-US")}</td>
                                                <td>pre</td>
                                                <td><a href="/65dea3e81d2f7e4eeb111e5e?pnrid=${pnr._id}" type="button" class="btn btn-link btn-sm">View</a></td>
                                            </tr>`

        })
        _content += `
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                <script>
                    $(document).ready(function() {
                        // Initialize DataTable without search
                        $('#pnr-table').DataTable({
                        searching: false
                        });
                    });
                </script>
            `
        var html = html_doc(req, res, next, _content)
        res.send(html)
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