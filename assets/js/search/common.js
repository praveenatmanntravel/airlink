
var search_filters = {
    data: {
        airlines: { 'AA': { count: 12, min_fare: 1234 }, 'AI': { count: 11, min_fare: 23143 } },
        layovers_airport: ['DEL', 'SIN', 'MEL'],
        journy_list: []
    },
    selected: {}
}

const buildFilter = () => {
    var s = ``



    if (search_filters?.data?.journy_list.hasOwnProperty('length') && search_filters?.data?.journy_list.length > 0) {
        search_filters?.data?.journy_list.forEach((journy) => {

            s += `
            <div class="card custom-collapse">
                <div class="card-body">
                    <div class="card-widgets">
                        <a data-bs-toggle="collapse" href="#f_journy${journy.origin}${journy.destination}" role="button" aria-expanded="true" aria-controls="onwardJourny" class=""><i class="mdi mdi-chevron-down"></i></a>
                    </div>
                    <h4 class="card-title mb-0">${journy.origin} to ${journy.destination}</h4>
                    <div id="f_journy${journy.origin}${journy.destination}" class="pt-2 mt-2 border-top collapse show" style="">
                        <h5>Stops From ${AirportData[journy.origin]['city']}</h5>
                        <div class="my-3 fs-6">`

            for (const [k, v] of Object.entries(journy.stops)) {
                s += `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" >
                                    <label class="form-check-label" >${k} (${v.count})</label>
                                </div>
                                <span>$1102</span>
                            </div>`
            }
            s += `
                        </div>
                        <h5>Departure From ${AirportData[journy.origin]['city']}</h5>
                        <div class="my-3 d-flex align-items-center gap-2 justify-content-star flex-wrap">
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class="uil-sunset pt-1 fs-4"></i>
                                <div class="py-1">before 6 AM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class="uil-sun pt-1 fs-4"></i>
                                <div class="py-1">6 AM - 12 PM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class="uil-cloud-sun pt-1 fs-4"></i>
                                <div class="py-1">12 PM - 6 PM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class=" uil-cloud-moon pt-1 fs-4"></i>
                                <div class="py-1">After 6 PM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                        </div>
                        <h5>Arrival at ${AirportData[journy.destination]['city']}</h5>
                        <div class="mt-3 d-flex align-items-center gap-2 justify-content-star flex-wrap">
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class="uil-sunset pt-1 fs-4"></i>
                                <div class="py-1">before 6 AM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class="uil-sun pt-1 fs-4"></i>
                                <div class="py-1">6 AM - 12 PM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class="uil-cloud-sun pt-1 fs-4"></i>
                                <div class="py-1">12 PM - 6 PM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                            <div class="filtertimeslot badge badge-outline-secondary fw-normal">
                                <i class=" uil-cloud-moon pt-1 fs-4"></i>
                                <div class="py-1">After 6 PM</div>
                                <p class="mb-1 fw-bold">$1010</p>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            `
        })
    }


    if (search_filters?.data?.airlines) {
        s += `
        <div class="card custom-collapse">
                <div class="card-body">
                    <div class="card-widgets">
                        <a data-bs-toggle="collapse" href="#airlinefilter_list" role="button" aria-expanded="false" aria-controls="airlinelist"><i class="mdi mdi-chevron-down"></i></a>
                    </div>
                    <h4 class="card-title mb-0">Airlines</h4>
                    <div id="airlinefilter_list" class="collapse pt-2 mt-2 show border-top">
                        <div class="mb-3 fs-6">`
        $.each(search_filters?.data?.airlines, (airline_code, _data) => {
            s += `
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" name="airline" >
                                    <label class="form-check-label" >${AirlineData[airline_code]?.name} (${_data.count})</label>
                                </div>
                                <span>$ ${_data.min_fare}</span>
                            </div>
                                `
        })
        s += ` 
                        </div>
                    </div>                              
                </div>
            </div>
        `
    }

    $('#ui_filters').append(s);
}

buildFilter();
const airportCity = (airport) => { return (AirportData.hasOwnProperty(airport) ? AirportData[airport]['city'] : '--') }

const amount_format = (i) => (new Intl.NumberFormat().format(i))

$(`#searched`).on('click', 'button', function () {
    search_panel('form')
})

$(document).ready(function () {


    $("#searchFlight").submit(function (event) {

        event.preventDefault();
        event.target.classList.add('processing')
        //$(event.target).addClass('processing')
        //return false
        var form_action = event.target.getAttribute("action");

        var error = false; search_form_params = {};
        ($(this).serializeArray()).map(e => { search_form_params[e.name] = e.value }); console.log(search_form_params);
        search_form_params.fun = 'searchFlight';

        $.ajax({
            data: search_form_params, type: "POST", url: form_action, dataType: "json", encode: true,
        }).done(function (data) {
            data = data;

            if (data.provider == 'travelport') {
                TP_app_token = data.TP_app_token;
                tp_parse_to_flight_display(data.apiResp)
            } else if (data.provider == 'ndcSIA') {
                sia_resp_id = data.sia_resp_id
                sia_parse_to_flight_display(data.apiResp)
            }

            console.log(data)

            // var _Offers = data?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['OffersGroup']?.['CarrierOffers']?.['Offer']
            // var _segs = data?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['AirShoppingProcessing']?.['MarketingMessages']?.['MarketMessage']?.['Associations']?.['OfferAssociations']?.['Flight']?.['FlightSegmentReference']
            // var _Penalty = data?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['DataLists']?.['PenaltyList']?.['Penalty']
            // var _PriceClass = data?.['soap:Envelope']?.['soap:Body']?.['AirShoppingRS']?.['Response']?.['DataLists']?.['PriceClassList']?.['PriceClass']
            // alert(_Offers?.length)
            // $.each(_Offers, function (index, offer) {
            //     var a = `<b>OfferID </b>${JSON.stringify(offer.OfferID)}<br><b>BaggageAllowance </b>${JSON.stringify(offer.BaggageAllowance)}<br><b>PenaltyRefID </b>${JSON.stringify(offer.PenaltyRefID)}<br><b>JourneyOverview </b>${JSON.stringify(offer.JourneyOverview)}
            //     <ol>`

            //     $.each(offer.OfferItem.FareDetail/*.FareComponent*/, function (index, FareDetail) {
            //         if (FareDetail?.FareComponent) {
            //             a += FareDetail.FareComponent.map((aa) => `<li><b class="text-danger" >Leg: </b>${JSON.stringify(aa)}</li>`)
            //         } else {
            //             a += `<li> + ${JSON.stringify(FareDetail)}</li>`
            //         }
            //     })
            //     a += `</ol>`
            //     $('#f_s_placholder').append(`${a}<hr>`)
            // })
            // $('#f_s_placholder').append(`<hr><hr><hr>`)
            // $.each(_PriceClass, function (index, PriceClass) {
            //     $('#f_s_placholder').append(`${JSON.stringify(PriceClass)}<hr>`)
            // })
            // var SEGS = {}
            // $.each(_segs, function (index, value) {
            //     if (!SEGS.hasOwnProperty(value['ref'])) {
            //         SEGS[value['ref']] = {}
            //     }
            //     SEGS[value['ref']][value['ClassOfService']['Code']['$t']] = value['ClassOfService']['Code']['SeatsLeft']
            //     $('#seg_placholder').append(`${JSON.stringify(value)}<hr>`)
            // })
            // console.log('SEGS', SEGS);

        })
            .fail(function (e) {
                console.log('error', e)
            })
            .always(function () {
                event.target.classList.remove('processing')
                search_panel('min')
                //const myModalAlternative = new bootstrap.Modal(document.getElementById('confirmation'), { keyboard: false, backdrop: true })
                //$('#confirmation').modal('show');
            });

    });
    search_panel('form')
})

const search_panel = (mode) => {

    if (mode == 'min') {

        $("#search_form").hide()


        var str = `
        <div class="col-auto">
            <h5 class="airports" >${airportCity(search_form_params.from)} (${search_form_params.from}) -  ${airportCity(search_form_params.to)} (${search_form_params.to})</h5>
        </div>
        <div class="col-auto"> 
            <div class="traveler" ><strong>${search_form_params.Cabin}</strong> | ${search_form_params.nAdt} Adult, ${search_form_params.nChd} Child, ${search_form_params.nInf} Infant</div>
        </div>`
        if (search_form_params.journeytype == 'return') {
            const dates = search_form_params.returnDate.split(" to ");
            str += `
            <div class="col-auto">
                <div class="ddate"><strong>Departure:</strong> ${dates[0]} </div>
            </div>
            <div class="col-auto">
                <div class="rdate"><strong>Return:</strong> ${dates[1]}</div>
            </div>
            `
        } else {
            str += `
            <div class="col-auto">
                <div class="ddate"><strong>Departure:</strong> ${search_form_params.deptDate} </div>
            </div>`
        }
        str += `
        <div class="col-auto ms-auto">
            <button type="submit" class="btn btn-primary ms-auto" >
                <i class="uil-search me-1"></i> <span>Update Search</span>
            </button>
        </div>
        `

        $("#searched").html($(str))
        $("#searched").show()
    } else if (mode == 'form') {
        $("#search_form").show()
        $("#searched").hide()
    }
}

function fetchForPNRView(pnrid) {
//alert(pnrid)
    const data = { pnrid: pnrid, 'do': 'dataForPnrView' }
    $.ajax({
        data: data, type: "POST", url: `/65dea3e81d2f7e4eeb111e5e/dataForPnrView`, dataType: "json", encode: true,
    }).done(function (d) {
        
        if(d.provider == 'ndcSIA'){
            build_PNRview(d)
        }
        else if(1){
            alert('Error: 48')
        }

    }).fail(function (e) {
        console.log('error', e)
    })
        .always(function () {
            //event.target.classList.remove('processing')
            search_panel('min')
            //const myModalAlternative = new bootstrap.Modal(document.getElementById('confirmation'), { keyboard: false, backdrop: true })
            //$('#confirmation').modal('show');
        });
}


const flightDetailOffcanvas = document.getElementById('flightDetailOffcanvas')
flightDetailOffcanvas.addEventListener('show.bs.offcanvas', event => {

    const button = event.relatedTarget
    const provider = button.getAttribute('provider')
    var str = ``
    if (provider == 'ndcSIA') {
        const FLTs = button.getAttribute('FLTs')
        str = sia_buildFlightDetails(FLTs)
    }
    if (provider == 'travelport') {

    }
    flightDetailOffcanvas.querySelector('.offcanvas-body').innerHTML = str
})

$(`body`).on('click', '.select_fare', (event) => {
    event.preventDefault()
    const button = event.target
    const provider = button.getAttribute('provider')
    const $this = $(this)

    var s = ``
    if (provider == 'travelport') {
        s = tp_buld_fareselectedui(button)
    } else if (provider == "ndcSIA") {
        sia_buld_fareselectedui(button)
    }
    //alert(1)
});


// display fare rule

const fareRuleModel = document.getElementById('fareRuleModel')
fareRuleModel.addEventListener('show.bs.model', event => {

    const button = event.relatedTarget
    const provider = button.getAttribute('provider')
    var str = ``
    if (provider == 'ndcSIA') {
        const FLTs = button.getAttribute('FLTs')
        str = sia_buildFlightDetails(FLTs)
    }
    if (provider == 'travelport') {

    }
    flightDetailOffcanvas.querySelector('.offcanvas-body').innerHTML = str
})

$('body').on('change', 'select[name=provider]', (e) => $('#searchFlight').attr('action', `${($('#searchFlight').attr('action').split('/'))[0]}/${e.target.value}`))



