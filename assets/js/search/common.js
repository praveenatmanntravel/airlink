
const airportCity = (airport) => {  return (AirportData.hasOwnProperty(airport) ? AirportData[airport]['city'] : '--') }

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

        var error = false; tp_search_params = {};
        ($(this).serializeArray()).map(e => { tp_search_params[e.name] = e.value }); console.log(tp_search_params);
        tp_search_params.fun = 'searchFlight';

        $.ajax({
            data: tp_search_params, type: "POST", url: form_action, dataType: "json", encode: true,
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
        $("#searched").html(`
        <div class="col-auto">
            <h5 class="airports" >${airportCity(tp_search_params.from)} (${tp_search_params.from}) -  ${airportCity(tp_search_params.to)} (${tp_search_params.to})</h5>
        </div>
        <div class="col-auto"> 
            <div class="traveler" ><strong>${airportCity(tp_search_params.Class)}</strong> | ${airportCity(tp_search_params.nAdt)} Adult, ${airportCity(tp_search_params.nChd)} Child</div>
        </div>
        <div class="col-auto">
            <div class="ddate"><strong>Departure:</strong> 2023-12-05</div>
        </div>
        <div class="col-auto">
            <div class="rdate"><strong>Return:</strong> 2023-12-05</div>
        </div>
        <div class="col-auto ms-auto">
            <button type="submit" class="btn btn-primary ms-auto" >
                <i class="uil-search me-1"></i> <span>Update Search</span>
            </button>
        </div>
    `);

        $("#searched").show()
    } else if (mode == 'form') {
        $("#search_form").show()
        $("#searched").hide()
    }
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
    if(provider == 'travelport'){

    }
    flightDetailOffcanvas.querySelector('.offcanvas-body').innerHTML = str
})


$('body').on('change', 'select[name=provider]', (e) => $('#searchFlight').attr('action', `${($('#searchFlight').attr('action').split('/'))[0]}/${e.target.value}`))



