var DataLists = {}
var OriginDestIDs = {}
var legGroup = {}
var OffersGroup = {}
var paxList = {}
var ShoppingResponseID = ``
var sia_resp_id = ``

const siaNDC_baggage = (o) => {
    var str = ``;
    if (o?.length > 0) {
        o?.forEach((a) => str += DataLists[a.BaggageAllowanceRefID]?.['WeightAllowance']?.['MaximumWeightMeasure']?.['#text'])
    } else {
        str += DataLists[o.BaggageAllowanceRefID]?.['WeightAllowance']?.['MaximumWeightMeasure']?.['#text']
    }
    return str;
}

const sia_journy = (o) => {
    var str = ``
    if (o?.length > 0) {
        o.forEach((a) => {

            str += `
            <td>
                ${sia_duration(DataLists[a.PaxJourneyRefID]['Duration'])}
            </td>
            <td>
                ${((DataLists[a.PaxJourneyRefID]?.PaxSegmentRefID.length || 1) - 1)}
            </td>
            `
        })
    } else {
        str += `
        <td>
           --
        </td>`
    }
    return str
}

const sia_duration = (i) => i?.replace('P', '').replace('D', 'd ').replace('T', '').replace('H', 'h ').replace('M', 'm')

const sia_timediff = (a, b) => {
    var s = ((new Date(a)).getTime() - (new Date(b)).getTime()) / 1000

    h = Math.floor(s / 60 / 60);
    m = Math.floor((s / 60 / 60 - h) * 60);

    return `${h}h ${m}m`
}
const sia_date = (i) => (new Date(i)).toDateString()
function sia_parse_to_flight_display(d) {

    DataLists = {}
    OriginDestIDs = {}
    legGroup = {}
    OffersGroup = {}
    paxList = {}
    ShoppingResponseID = ``

    //console.log(d)
    d = JSON.parse(d)
    //console.log(d)
    const Response = d?.['Envelope']?.['Body']?.['AirShoppingRS']?.['Response']
    console.log('Response', Response)

    sia_parseDataList(Response?.['DataLists'])
    parseFilter()
    ShoppingResponseID = Response?.ShoppingResponse?.ShoppingResponseID

    if (Response?.OffersGroup?.CarrierOffers?.Offer.length > 0) {


        Response?.OffersGroup?.CarrierOffers?.Offer?.forEach((o) => {

            OffersGroup[o.OfferID] = o

            const mPrice = o.OfferItem.Price.TotalAmount
            var s = []
            if (o.JourneyOverview.JourneyPriceClass?.length > 0) {
                o.JourneyOverview.JourneyPriceClass.forEach((i) => {
                    s.push(i.PaxJourneyRefID)
                })
            } else {
                s.push(o.JourneyOverview.JourneyPriceClass.PaxJourneyRefID)
            }
            if (legGroup.hasOwnProperty(s.toString())) {
                legGroup[s.toString()].mPrice = (legGroup[s.toString()].mPrice < mPrice) ? legGroup[s.toString()].mPrice : mPrice
                legGroup[s.toString()].OfferIDs?.push(o.OfferID)
            } else {
                legGroup[s.toString()] = { mPrice: mPrice, OfferIDs: [o.OfferID] }
            }

        })
        //console.log('legGroup', legGroup)

        $("#flight_list_holder").html(` `)
        if (Object.keys(legGroup)?.length > 0) {

            $("#flight_list_holder").append($(`
            <div class="flight-segment-0" id="flight-segment-0">
                <div class="row align-items-center mb-2"> 
                    <div class="col-12 result-title-cls"> 
                        <h4><i class="uil-plane-departure me-1"></i>Flights from -- to -- </h4>
                    </div> 
                </div>
                <ul class="search-list list-group accordion custom-accordion list-unstyled" id="${ShoppingResponseID}"></ul>
            </div>`));

            $.each(legGroup, (k, v) => {
                $(`#${ShoppingResponseID}`).append(`
                    <li class="list-item accordion-item border-0 mb-2">
                        <div class="container list-item-inner border">
                            <div class="row list-item-main shadow">
                                <div class="col-12 col-md-10 col-xl-10 col-lg-10 p-2">
                                    <div class="row row-gap-2">
                                        ${sia_buildFTL(k)}
                                    </div>
                                </div>
                                <div class="col-12 col-md-3 col-xl-2 col-lg-2 px-0 text-center border-start">
                                    <div class="fare-button p-2">
                                        <span class="owd-fare-btn-wrapper"> 
                                            <span class="owd-amount-cabin-wrapper"> 
                                                <div class="owd-amount-prefix-from fs-6">From</div>
                                                <h4 class="owd-amount-price my-0">
                                                    $${amount_format(v.mPrice)}
                                                </h4>
                                                <div class="owd-amount-price-view mt-1"> 
                                                    <a class="link-primary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#flightDetailOffcanvas" aria-controls="offcanvasRight" FLTs=${k} provider="ndcSIA" >Flight Details</a>
                                                </div>
                                                <div class="owd-amount-price-view"> 
                                                    <a class="view-btn link-secondary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#${k}_ff" aria-expanded="true"><span class="view-detail">View</span><span class="hide-detail">Hide</span> ${v.OfferIDs?.length || ''} Offers</a>
                                                </div>
                                            </span>     
                                        </span>
                                    </div>
                                </div>  
                            </div>
                        </div>
                            <!-- Starts fare Details Html  -->
                            <div id="${k}_ff" class="accordion-collapse show-detail mt-2 collapse" data-bs-parent="#departFlightList">
                            <!-- Depart flight details section -->
                                <div class="f-detail-sec depart-flight-info">
                                    <div class="row m-auto flight-header">
                                        <div class="col-12 p-0 position-relative table-responsive-lg d-flex justify-content-lg-end">
                                            <div class="select-flight__fare-table economy-tbl flex-grow-1">
                                                <div class="select-flight__fare-head-row">
                                                    <div class="select-flight__fare-title-wrap select-flight__farec-condition"><strong>fare conditions</strong></div>   
                                                </div> 
                                                <div class="select-flight__fare-col select-flight__fare-col-footer-wrap">
                                                    <div class="select-flight__fare-col-footer select-flight__fare-link-wrap bg-body-tertiary"></div> 
                                                </div>
                                                <div class="select-flight__fare-col summary-sec">
                                                    <div class="select-flight__fare-icon">  
                                                        <i class="mdi mdi-bag-suitcase-outline pe-1 fs-4"></i>
                                                        <span class="select-flight__fare-icon-text">Baggage</span>
                                                    </div>
                                                    <div class="select-flight__fare-icon">
                                                        <i class="mdi mdi-seat-recline-normal pe-1 fs-4"></i> 
                                                        <span class="select-flight__fare-icon-text">Seat selection</span>
                                                    </div>
                                                </div>
                                                <div class="select-flight__fare-col summary-sec">
                                                    <div class="select-flight__fare-icon">
                                                        <i class="mdi mdi-gift-outline pe-1 fs-4"></i> 
                                                        <span class="select-flight__fare-icon-text">Earn miles</span>
                                                    </div>
                                                    <div class="select-flight__fare-icon">
                                                        <i class="mdi mdi-arrow-up-bold-circle-outline pe-1 fs-4"></i> 
                                                        <span class="select-flight__fare-icon-text">Upgrade with miles</span>
                                                    </div>    
                                                </div> 
                                                <div class="select-flight__fare-col summary-sec">
                                                    <div class="select-flight__fare-icon">
                                                        <i class="uil uil-presentation-times pe-1 fs-4"></i> 
                                                        <span class="select-flight__fare-icon-text">Booking cancellation fee</span>
                                                    </div>
                                                    <div class="select-flight__fare-icon">
                                                        <i class="uil uil-sync pe-1 fs-4"></i><span class="select-flight__fare-icon-text-inner fs-small">Booking change fee <div><small>(a fare difference may apply)</small></div></span>
                                                    </div>
                                                    <div class="select-flight__fare-icon">
                                                        <i class="mdi mdi-close-circle pe-1 fs-4"></i> No show fee 
                                                    </div>
                                                    <div class="select-flight__fare-icon">
                                                        <i class="mdi mdi-information-variant pe-1 fs-4"></i> More Information
                                                    </div>
                                                </div>
                                            </div>  
                                            <div class="d-flex position-relative flight_fare_selection flex-grow-1" >
                                                ${sia_bindFF(k)}
                                            </div>
                                        </div>    
                                    </div>
                                </div>   
                            </div>
                            <!-- Ends fare Details Html  -->
                        </li>
                    `)
            })
        }
    } else {

    }

    console.log('DataLists', DataLists)
}

function sia_build_price_tooltip() {

}

function sia_buld_fareselectedui(button) {
    const OfferID = button.getAttribute('OfferID')
    const Offer = OffersGroup[OfferID]

    var s = ``
    // parsing JourneyOverview
    s += `
    <div class="left-info col-md-9 d-flex flex-wrap row-gap-4" >`

    var FLTs = []
    if (Offer.JourneyOverview.JourneyPriceClass?.length > 0) {
        Offer.JourneyOverview.JourneyPriceClass.forEach((i) => {
            FLTs.push(i.PaxJourneyRefID)
        })
    } else {
        FLTs.push(Offer.JourneyOverview.JourneyPriceClass.PaxJourneyRefID)
    }


    FLTs.forEach((FLT_ID) => {
        const FLT = DataLists[FLT_ID]

        var journyStart
        var journyEnd
        $.each(FLT.PaxSegmentRefID, (n, SEGid) => {
            const SEG = DataLists[SEGid]
            if (n == 0) {
                journyStart = [SEG.Dep.IATA_LocationCode, SEG.Dep.AircraftScheduledDateTime]
            }
            journyEnd = [SEG.Arrival.IATA_LocationCode, SEG.Arrival.AircraftScheduledDateTime]
        })

        s += `
        <div class="flight__detail-inner px-4 flex-fill">
            <div class="bp-flight-content d-flex">
                <div class="bp-flight_description">
                    <div class="bp-flight_date fs-6">${sia_date(journyStart[1])}</div> 
                    <div class="bp-flight_hour fw-bold fs-4"><span>${journyStart[0]} ${(journyStart[1]).substr(11, 5)}</span></div>
                </div>
                <div class="bp-flight-content-wrap px-3 text-center">
                    <i class="mdi mdi-arrow-right-thin fs-4"></i> 
                    <div class="bp-flight-time fs-6">${sia_duration(FLT.Duration)}</div>
                </div>
                <div class="bp-flight_description">
                    <div class="bp-flight_date fs-6">${sia_date(journyEnd[1])}</div> 
                    <div class="bp-flight_hour fw-bold fs-4"><span>${journyEnd[0]} ${(journyEnd[1]).substr(11, 5)}</span></div>
                </div>
            </div>
        </div>
        `
    })
    s += `
    </div>`
    s += `
    <div class="right-info col-md-3 d-flex flex-wrap align-items-center justify-content-around">
        <div>
            <div class="mb-1"><a class="view-btn link-secondary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#flightDetailOffcanvas" aria-controls="offcanvasRight" flts="${FLTs.toString()}" provider="ndcSIA" >Flight Detail &gt;</a></div>
            <span class="px-2 rounded class-detect-line economy-color text-white fs-6">${DataLists[Offer.JourneyOverview.PriceClassRefID]?.['Name']}</span>
            <div class="fw-bold fs-3 text-primary"><span>$</span> ${amount_format(Offer.OfferItem.Price.TotalAmount)}<span class="fare-calculation fw-normal pe-1" type="button" data-bs-placement="left"><i class="mdi mdi-information-outline"></i></span></div>
        </div>
        <div class="actions-cls">
            <form class="continue-booking" id="SiadoPrice" > 
                <input type="hidden" name="sia_resp_id" value="${sia_resp_id}" /> 
                <input type="hidden" name="do" value="OfferPrice" /> 
                <input type="hidden" name="OfferID" value="${OfferID}" /> 
                <button type="submit" class="btn btn-primary">Continue</button>
                <a type="button" href="javascript:$('#selected_product').addClass('d-none').removeClass('d-flex')" class="btn btn-secondary" onClick="" >Cancel</a>
            </form>
            
        </div>
    </div>
    `
    // price 

    $("#selected_product").addClass('d-flex').removeClass('d-none').html(s)
    //$("#selected_product").addClass('d-none').removeClass('d-flex')

    //alert(OfferID)
}

function sia_buildFTL(i) {
    var str = ``

    const FLTs = i.split(',')

    $.each(FLTs, (i, FLTid) => {
        const FLT = DataLists[FLTid]

        var segStart //= FlightSegment.length
        var segMiddle = ''// = FlightSegment.length
        var segEnd //= FlightSegment.length
        var stops = FLT.PaxSegmentRefID?.length || 0

        if (FLT.PaxSegmentRefID?.length > 0) {
            $.each(FLT.PaxSegmentRefID, (n, SEGid) => {
                const SEG = DataLists[SEGid]
                //console.log(SEG)
                if (n == 0) {
                    segStart = `
                    <div class="fw-semibold text-uppercase fs-4 text-danger">${SEG.Dep.IATA_LocationCode} <span>${(SEG.Dep.AircraftScheduledDateTime).substr(11, 5)}</span></div>
                    <div class="fs-6">${sia_date(SEG.Dep.AircraftScheduledDateTime)}</div> 
                    <div class="fs-5 text-black d-none">${airportCity(SEG.Dep.IATA_LocationCode)}</div>
                    `
                }
                if (n > 0) {
                    segMiddle += `
                    <span class="stops text-center px-1"><i class="mdi mdi-rhombus-medium"></i><small class="d-block fw-bold">${SEG.Dep.IATA_LocationCode}</small></span>
                    <div class="graphics-line-horizontal"></div>`
                }
                if (n == (FLT.PaxSegmentRefID?.length - 1)) {
                    segEnd = `
                    <div class="fw-semibold text-uppercase fs-4 text-danger">${SEG.Arrival.IATA_LocationCode} <span>${(SEG.Arrival.AircraftScheduledDateTime).substr(11, 5)}</span></div>
                    <div class="fs-6">${sia_date(SEG.Arrival.AircraftScheduledDateTime)}</div>
                    <div class="fs-5 text-black d-none">${airportCity(SEG.Arrival.IATA_LocationCode)}</div>
                `
                }
            })
        } else {

        }


        str += `
    <div class="col segment-lst">
        <div class="row">
            <div class="col-12 mb-2 d-flex justify-content-between">
                <span class="stop-time"><strong>${stops == 1 ? `NonStop` : `${stops - 1} Stops`}</strong> • ${sia_duration(FLT.Duration)}</span>
                <div class="airline-info-block">
                    <img src="/images/Airline/Square/SQ.png" alt="" width="18" class="img-fluid ms-1"> 
                    <img src="/images/Airline/Square/SQ.PNG" alt="" width="18" class="img-fluid ms-1"> 
                </div>
            </div>
            <div class="col-12 col-md-3 col-xl-3 col-lg-3">
               ${segStart}
            </div>
            <div class="col-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column">
                <div class="d-flex flex-row align-items-center graphycs-div position-relative">
                    
                    <i class="mdi mdi-airplane fs-4"></i>      
                    <div class="graphics-line-horizontal"></div>
                    <div class="layover-stops d-flex position-absolute translate-middle-x start-50">
                        ${segMiddle}
                    </div>
                    <i class="mdi mdi-map-marker-radius"></i>
                </div>
            </div>
            <div class="col-12 col-md-3 col-xl-3 col-lg-3">
                ${segEnd}
            </div>
        </div>
    </div>`
    })
    return str
}

function sia_bindFF(i) {

    var str = ``
    $.each(legGroup[i].OfferIDs, (n, OfferID) => {

        const Offer = OffersGroup[OfferID]

        str += `
        <div class="select-flight__fare-table economy-tbl flex-grow-1">
            <div class="select-flight__fare-head-row">
                <div class="select-flight__fare-title-wrap economy-color fw-bold">${DataLists[Offer.JourneyOverview.PriceClassRefID]?.['Name']}</div>
            </div> 
            <div class="select-flight__fare-col select-flight__fare-col-footer-wrap">
                <div class="select-flight__fare-col-footer bg-body-tertiary">
                    <h4 class="select-flight__fare-footer-price">
                        <span class="fare-calculation fw-normal pe-1" type="button" data-bs-toggle="tooltip" data-bs-placement="left" aria-label="fare calculation" data-bs-original-title="fare calculation">
                            <i class="mdi mdi-information-outline"></i>
                        </span>
                        $ ${amount_format(Offer.OfferItem.Price.TotalAmount)}
                    </h4> 
                    <a tabindex="0" href="#" class="btn btn-outline-primary btn-sm select_fare x_sia_offer_select" OfferID=${Offer.OfferID} provider="ndcSIA" >Select</a>
                </div>
            </div> 
            <div class="select-flight__fare-col summary-sec">
                <div class="select-flight__fare-select"><span class="fare-select-text fw-bold">30kg + 7kg</span></div> 
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold complimentary">Complimentary (Standard &amp; Forward Zone Seats)</span>
                </div>    
            </div> 
            <div class="select-flight__fare-col summary-sec">
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold">6,334 miles</span>
                </div>
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold">Allowed</span>
                </div>    
            </div> 
            <div class="select-flight__fare-col summary-sec">
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold">AUD 130</span>
                </div>
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold complimentary">Complimentary</span>
                </div>
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold">AUD 130</span>
                </div>
                <div class="select-flight__fare-select">
                    <span tabindex="0" class="fare-select-text fw-bold fs-6 farerules text-decoration-underline link-offset-2" type="button" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">View More<i class="mdi mdi-chevron-right pe-1 fs-5"></i></span>
                </div>
            </div>
        </div> 
        `
    })

    return str
}

function sia_buildFlightDetails(i) {
    var str = ``

    //alert(i)
    const FLTs = i.split(',')
    $.each(FLTs, (i, FLTid) => {
        const FLT = DataLists[FLTid]
        // parsing 
        if (FLT.PaxSegmentRefID?.length > 0) {
            var journy = ``
            var journyStart
            var journyEnd
            var prev_Arrival = ``
            $.each(FLT.PaxSegmentRefID, (n, SEGid) => {
                const SEG = DataLists[SEGid]

                if (n == 0) {
                    journyStart = SEG.Dep.IATA_LocationCode
                }

                if (n > 0) {
                    journy += `
                    <div class="flight-details__transit p-2 mb-2 border-bottom border-top bg-light">
                        <p class="transit mb-2"><strong>${sia_timediff(SEG.Dep.AircraftScheduledDateTime, prev_Arrival.AircraftScheduledDateTime)}</strong> transit at ${SEG.Dep.IATA_LocationCode} </p>
                        <div class="airport">${airportCity(SEG.Dep.IATA_LocationCode)}</div> 
                    </div>`
                }

                journy += `
                <div class="flight-details__segment mb-2 px-2" id="at-flight-details-segment-1">
                    <p class="flight-details__date mb-1 fs-6"> ${sia_date(SEG.Dep.AircraftScheduledDateTime)} </p>
                    <div class="itinerary d-flex">
                        <div class="me-3 flight-timimg">
                            <div class="at-flight-details-segment-depart-time"> ${(SEG.Dep.AircraftScheduledDateTime).substr(11, 5)} </div>
                        </div>
                        <div class="border-start ps-3 pb-4 position-relative">
                            <i class="mdi mdi-airplane fs-3"></i>
                            <div class="at-flight-details-segment-depart-city">${SEG.Dep.IATA_LocationCode}</div>
                            <p class="at-flight-details-segment-depart-station">${airportCity(SEG.Dep.IATA_LocationCode)} </p>
                        </div>
                    </div>
                    <div class="itinerary d-flex">
                        <div class="me-3 flight-timimg">
                            <div class="at-flight-details-segment-duration"> ${sia_duration(SEG.Duration)} </div>
                        </div>
                        <div class="border-start ps-3 pb-5">
                            <div class="vehicle-num"> <span class="flight-num">${SEG.MarketingCarrierInfo.CarrierDesigCode} - ${SEG.MarketingCarrierInfo.MarketingCarrierFlightNumberText
                    }</span></div>
                            <p class="at-flight-details-segment-operator mb-0"> Operated by ${SEG.OperatingCarrierInfo.CarrierName}</p>
                        </div>
                    </div>
                    <div class="itinerary d-flex">
                        <div class="me-3 flight-timimg">
                            <span class="at-flight-details-segment-arrival-time">${(SEG.Arrival.AircraftScheduledDateTime).substr(11, 5)}</span>
                        </div>
                        <div class="ps-3 position-relative">
                            <i class="mdi mdi-map-marker-radius fs-3"></i>
                            <div class="at-flight-details-segment-arrival-city"> ${SEG.Arrival.IATA_LocationCode} </div>
                            <p class="at-flight-details-segment-arrival-station mb-0"> ${airportCity(SEG.Arrival.IATA_LocationCode)} </p>
                        </div>
                    </div>
                    <p class="flight-details__date mb-3 fs-6"> ${sia_date(SEG.Arrival.AircraftScheduledDateTime)} </p>
                </div>`
                prev_Arrival = SEG.Arrival
                journyEnd = SEG.Arrival.IATA_LocationCode
                //console.log(SEG)
            })

            str += `
            <h4 class="at-flight-details-journey-title text-primary mb-3 fw-semibold bg-light p-2 d-flex justify-content-between align-items-center">
                <span><i class="mdi mdi-airplane pe-1"></i>${journyStart} to ${journyEnd}</span>
                <span class="font-15 text-secondary fw-normal">${sia_duration(FLT.Duration)}</span>
            </h4>
            ${journy}`
        }
    })

    return str;
}

$(document).ready(function () {

    $("#create-pnr-form").submit(function (event) {

        event.preventDefault();
        event.target.classList.add('processing')
        //$(event.target).addClass('processing')
        //return false
        var form_action = event.target.getAttribute("action");

        var error = false;
        var fData = {};
        ($(this).serializeArray()).map(e => { fData[e.name] = e.value });
        fData.sia_resp_id = sia_resp_id
        fData.do = `OrderCreate`

        $.ajax({
            data: fData, type: "POST", url: form_action, dataType: "json", encode: true,
        }).done(function (data) {
            data = data;

            console.log(data)

        })
            .fail(function (e) {
                console.log('error', e)
            })
            .always(function () {
                event.target.classList.remove('processing')
            });

    });
    search_panel('form')
})

$('body').on('submit', '#SiadoPrice', function (event) {

    event.preventDefault()
    event.target.classList.add('processing')

    var error = false;
    var d = {};
    ($(event.target).serializeArray()).map(e => { d[e.name] = e.value });

    $.ajax({
        data: JSON.stringify(d),
        type: "POST",
        url: '64df02fd8312a4e7f7f8b7d1/ndcSIA',
        dataType: "json",
        encode: true,
        contentType: "application/json; charset=utf-8"

    }).done(function (data) {
        console.log(data)
        const OfferPriceRS = data.apiResp?.Envelope?.Body?.OfferPriceRS
        if (OfferPriceRS?.hasOwnProperty('Error')) {
            alert(OfferPriceRS.Error?.[`DescText`])
        } else {
            window.location.href = `64df02fd8312a4e7f7f8b7d1/createPNR?id=${data.sia_resp_id}`
        }
    })
        .fail(function (e) {
            console.log('error', e)
        })
        .always(function () {
            event.target.classList.remove('processing')
            //const myModalAlternative = new bootstrap.Modal(document.getElementById('confirmation'), { keyboard: false, backdrop: true })
            //$('#confirmation').modal('show');
        });
})

function sia_parseDataList(_dList) {

    if (_dList?.['BaggageAllowanceList']?.['BaggageAllowance'].hasOwnProperty('length')) {
        _dList?.['BaggageAllowanceList']?.['BaggageAllowance']?.forEach((a) => DataLists[a['BaggageAllowanceID']] = a)
    } else {
        DataLists[_dList?.['BaggageAllowanceList']?.['BaggageAllowance']?.['BaggageAllowanceID']] = _dList?.['BaggageAllowanceList']?.['BaggageAllowance']
    }

    if (_dList?.['OriginDestList']?.['OriginDest'].hasOwnProperty('length')) {
        _dList?.['OriginDestList']?.['OriginDest']?.forEach((a) => {
            DataLists[a['OriginDestID']] = a
            OriginDestIDs[a['OriginDestID']] = a
        })
    } else {
        DataLists[_dList?.['OriginDestList']?.['OriginDest']?.['OriginDestID']] = _dList?.['OriginDestList']?.['OriginDest']
        OriginDestIDs[_dList?.['OriginDestList']?.['OriginDest']?.['OriginDestID']] = _dList?.['OriginDestList']?.['OriginDest']
    }

    if (_dList?.['PaxJourneyList']?.['PaxJourney'].hasOwnProperty('length')) {
        _dList?.['PaxJourneyList']?.['PaxJourney']?.forEach((a) => DataLists[a['PaxJourneyID']] = a)
    } else {
        DataLists[_dList?.['PaxJourneyList']?.['PaxJourney']?.['PaxJourneyID']] = _dList?.['PaxJourneyList']?.['PaxJourney']
    }

    if (_dList?.['PaxList']?.['Pax'].hasOwnProperty('length')) {
        _dList?.['PaxList']?.['Pax']?.forEach((a) => {
            DataLists[a['PaxID']] = a
            paxList[a['PaxID']] = a
        })
    } else {
        DataLists[_dList?.['PaxList']?.['Pax']?.['PaxID']] = _dList?.['PaxList']?.['Pax']
        paxList[_dList?.['PaxList']?.['Pax']?.['PaxID']] = _dList?.['PaxList']?.['Pax']
    }

    _dList?.['PaxSegmentList']?.['PaxSegment']?.forEach((a) => DataLists[a['PaxSegmentID']] = a)
    _dList?.['PenaltyList']?.['Penalty']?.forEach((a) => DataLists[a['PenaltyID']] = a)

    if (_dList?.['PriceClassList']?.['PriceClass'].hasOwnProperty('length')) {
        _dList?.['PriceClassList']?.['PriceClass']?.forEach((a) => DataLists[a['PriceClassID']] = a)
    } else {
        DataLists[_dList?.['PriceClassList']?.['PriceClass']?.['PriceClassID']] = _dList?.['PriceClassList']?.['PriceClass']
    }

    if (_dList?.['ServiceDefinitionList']?.['ServiceDefinition'].hasOwnProperty('length')) {
        _dList?.['ServiceDefinitionList']?.['ServiceDefinition']?.forEach((a) => DataLists[a['ServiceDefinitionID']] = a)
    } else {
        DataLists[_dList?.['ServiceDefinitionList']?.['ServiceDefinition']?.['ServiceDefinitionID']] = _dList?.['ServiceDefinitionList']?.['ServiceDefinition']
    }


    console.log('DataLists', DataLists)
}

function parseFilter() {

    for (const [key, value] of Object.entries(OriginDestIDs)) {
        var stops = {}
        value?.PaxJourneyRefID?.forEach((FLT) => {

            const c = DataLists[FLT]?.PaxSegmentRefID.hasOwnProperty('length') ? (DataLists[FLT].PaxSegmentRefID.length - 1) : 0

            let i;
            if (c == 0) {
                i = 'Direct'
            } else if (c == 1) {
                i = '1 Stop'
            } else if (c == 2) {
                i = '2 Stops'
            } else {
                i = '+2 Stops'
            }

            if (stops.hasOwnProperty(i)) {
                stops[i]['count'] = stops[i]['count'] + 1
            } else {
                stops[i] = { count: 1 }
            }

        })
        search_filters.data?.journy_list?.push({ origin: value.OriginCode, destination: value.DestCode, stops: stops })
    }

    console.log(search_filters);
}

function fetchOfferPrice(id) {
    sia_resp_id = id
    const data = { sia_resp_id: sia_resp_id, 'do': 'getOfferPrice' }
    $.ajax({
        data: data, type: "POST", url: `/64df02fd8312a4e7f7f8b7d1/ndcSIA`, dataType: "json", encode: true,
    }).done(function (d) {
        //d = JSON.parse(d)

        const Response = d?.['apiResp']?.['Envelope']?.['Body']?.['OfferPriceRS']?.['Response']
        console.log('Response', d, Response)

        sia_parseDataList(Response?.['DataLists'])

        ShoppingResponseID = Response?.ShoppingResponse?.ShoppingResponseID

        // parsing seagments
        var FLTs = []
        if (Response?.PricedOffer?.hasOwnProperty('Offer')) {

            const selectedOffer = Response.PricedOffer.Offer

            if (selectedOffer.JourneyOverview.JourneyPriceClass?.length > 0) {
                selectedOffer.JourneyOverview.JourneyPriceClass.forEach((JourneyPriceClass) => {
                    FLTs.push(JourneyPriceClass.PaxJourneyRefID)
                })
            }
            else {
                FLTs.push(selectedOffer.JourneyOverview?.JourneyPriceClass.PaxJourneyRefID)
            }

            $(`#selected_flight-info`).append($(`
            <div class="container list-item-inner  border bg-primary bg-opacity-10">
                <div class="d-flex justify-content-between row align-items-center text-bg-light p-2">
                    <div class="col-12 col-md-10 col-xl-10 col-lg-10 p-2">
                        <div class="row row-gap-2">
                            ${sia_buildFTL(FLTs.toString())}
                        </div>
                    </div>

                    <div class="col-12 col-md-3 col-xl-2 col-lg-2 px-0 text-center border-start d-flex justify-content-center align-items-center">
                        <div class="fare-button p-2">
                            <span class="text-primary fw-semibold">${DataLists[selectedOffer.JourneyOverview.PriceClassRefID]?.['Name']}</span>
                            <h4 class="owd-amount-price mt-2">$ ${amount_format(selectedOffer.OfferItem.Price.TotalAmount['#text'])}</h4>
                            <div class="owd-amount-price-view"> 
                                <a class="view-btn link-secondary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#flightDetailOffcanvas" aria-controls="offcanvasRight" flts="${FLTs.toString()}" provider="ndcSIA" >Flight Detail &gt;</a>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            `))

            // parsing price-info
            const Price = selectedOffer.OfferItem?.Price
            //console.log(Price)
            if (Price?.hasOwnProperty(`BaseAmount`)) {
                $('#price-info').append($(`
                <li class="list-group-item base-fare">
                    <a class="d-flex justify-content-between align-items-center link-secondary" data-bs-toggle="collapse" href="#baseFare" role="button" aria-expanded="false" aria-controls="baseFare">
                        <span class="fw-normal title-cls">Base Fare</span>    
                        <span class="fw-semibold totalbasefare price">$ ${amount_format(Price.BaseAmount['#text'])}<i class="ps-2 mdi mdi-chevron-down fs-4"></i></span>
                    </a>
                    <div class="collapse" id="baseFare">
                        <div class="d-flex justify-content-between pt-2 align-items-center fs-6 text-secondary-emphasis">
                            <span>Adult(s) (1 X $1118.05)</span>
                            <span class="fw-normal totalbasefare price">$1118.05</span>
                        </div>
                    </div>
                </li>
                `))
            }

            if (Price?.hasOwnProperty(`TaxSummary`)) {
                $('#price-info').append($(`
                <li class="list-group-item base-fare">
                    <a class="d-flex justify-content-between align-items-center link-secondary" data-bs-toggle="collapse" href="#TaxSummary" role="button" aria-expanded="false" aria-controls="baseFare">
                        <span class="fw-normal title-cls">Tax Summary Fare</span>    
                        <span class="fw-semibold totalbasefare price">$ ${Price.TaxSummary?.TotalTaxAmount['#text']}<i class="ps-2 mdi mdi-chevron-down fs-4"></i></span>
                    </a>
                    <div class="collapse" id="TaxSummary">
                        <div class="d-flex justify-content-between pt-2 align-items-center fs-6 text-secondary-emphasis">
                            <span>Adult(s) (1 X $1118.05)</span>
                            <span class="fw-normal totalbasefare price">$1118.05</span>
                        </div>
                    </div>
                </li>
                `))
            }

            if (Price?.hasOwnProperty(`TotalAmount`)) {
                $('#price-info').append($(`
                <!-- grand total charge fare -->
                <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                        <span class="fs-5 fw-bold">
                            Total Amount</span>
                        <span class="fs-5">
                            <span class="fw-bold">$ ${Price.TotalAmount?.['#text']}</span>
                        </span>
                    </div>
                </li>
                `))
            }


            //parsing PaxList
            for (const [PaxID, pax] of Object.entries(paxList)) {


                var str = `
                    <div class="row pb-2 mb-2">
                        <div class="col-md-1">
                            <h5><span>1</span>. ${pax.PTC}</h5>
                        </div>
                        
                        <div class="col-md-2 mb-2 mb-md-0">
                            <div class="form-floating">
                            <select class="form-select" name="PaxData[${PaxID}][title]" >
                                <option selected="">select</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option value="1">Miss</option>
                            </select>
                            <label for="selectTitle">Title</label>
                            </div> 
                        </div>
                        <div class="col-md-3 mb-2 mb-md-0">
                            <div class="form-floating">
                            <input class="form-control" type="text" placeholder=" " required="" name="PaxData[${PaxID}][firstname]" >
                            <label for="">First Name</label>
                            </div>
                        </div> 
                        <div class="col-md-3 mb-2 mb-md-0">
                            <div class="form-floating">
                            <input class="form-control" type="text" placeholder=" " id="lastname" required="" name="PaxData[${PaxID}][lastname]" >
                            <label for="lastname">Last Name</label>
                            </div>
                        </div>
                        <div class="col-md-3 mb-2 mb-md-0">
                            <div class="form-floating">
                            <input class="form-control adult dob" type="text" placeholder=" " required=""name="PaxData[${PaxID}][dob]" >
                            <label for="">DOB</label>
                            </div>
                        </div>
                    </div> 
                    `
                $(`#pax-info`).append($(str))
                $(".dob").daterangepicker({
                    "autoApply": true,
                    showDropdowns: true,
                    maxDate: moment().format('YYYY-MM-DD'),
                    "locale": {
                        "format": "YYYY-MM-DD"
                    },
                    singleDatePicker: true
                });

            }


        } else {

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

function build_FareDetail() {

}

function sia_service_to_string(ServiceDefinitionRefID) {
    var s = ``
    if (DataLists.hasOwnProperty(ServiceDefinitionRefID)) {
        const ServiceDefinition = DataLists[ServiceDefinitionRefID]
        switch (ServiceDefinition.Name) {
            case "Bag allowances":
                const FBA = DataLists[ServiceDefinition.ServiceDefinitionAssociation?.BaggageAllowanceRefID] || false
                if (FBA) {
                    s += ` | Type: ${FBA.TypeCode} | <b>${FBA.WeightAllowance?.MaximumWeightMeasure?.['#text']} ${FBA.WeightAllowance?.MaximumWeightMeasure?.['@_UnitCode']}</b>`
                }
                break;
            case "Bag allowances":
        }
    }
    return s
}

function build_PNRview(d) {
    // parsing data for pnr view
    const rsJson = JSON.parse(d?.OrderRetrieve?.rsJson)
    console.log(rsJson);
    const Response = rsJson?.['Envelope']?.['Body']?.['OrderViewRS']?.['Response']
    console.log('Response', d, Response)
    const Order = Response?.Order

    sia_parseDataList(Response?.['DataLists'])




    $("#BookingRef-info").html(`PNR: ${Order.OrderID}`)

    var str = ``
    var PaxJourneyList = []
    if (Response.DataLists?.PaxJourneyList?.PaxJourney?.length) {
        $.each(Response.DataLists?.PaxJourneyList?.PaxJourney, (n, e) => { PaxJourneyList.push(e) })

    } else if (Response.DataLists?.PaxJourneyList?.PaxJourney) {
        PaxJourneyList.push(Response.DataLists?.PaxJourneyList?.PaxJourney)
    }
    var FLTs = []
    $.each(PaxJourneyList, (i, PaxJourney) => {
        FLTs.push(PaxJourney.PaxJourneyID)
        var segStart //= FlightSegment.length
        var segMiddle = ''// = FlightSegment.length
        var segEnd //= FlightSegment.length
        var stops = PaxJourney.PaxSegmentRefID?.length || 0

        if (PaxJourney.PaxSegmentRefID?.length > 0) {
            $.each(PaxJourney.PaxSegmentRefID, (n, SEGid) => {
                const SEG = DataLists[SEGid]
                //console.log(SEG)
                if (n == 0) {
                    segStart = `
                    <div class="fw-semibold text-uppercase fs-4 text-danger">${SEG.Dep.IATA_LocationCode} <span>${(SEG.Dep.AircraftScheduledDateTime).substr(11, 5)}</span></div>
                    <div class="fs-6">${sia_date(SEG.Dep.AircraftScheduledDateTime)}</div> 
                    <div class="fs-5 text-black d-none">${airportCity(SEG.Dep.IATA_LocationCode)}</div>
                    `
                }
                if (n > 0) {
                    segMiddle += `
                    <span class="stops text-center px-1"><i class="mdi mdi-rhombus-medium"></i><small class="d-block fw-bold">${SEG.Dep.IATA_LocationCode}</small></span>
                    <div class="graphics-line-horizontal"></div>`
                }
                if (n == (PaxJourney.PaxSegmentRefID?.length - 1)) {
                    segEnd = `
                    <div class="fw-semibold text-uppercase fs-4 text-danger">${SEG.Arrival.IATA_LocationCode} <span>${(SEG.Arrival.AircraftScheduledDateTime).substr(11, 5)}</span></div>
                    <div class="fs-6">${sia_date(SEG.Arrival.AircraftScheduledDateTime)}</div>
                    <div class="fs-5 text-black d-none">${airportCity(SEG.Arrival.IATA_LocationCode)}</div>
                `
                }
            })
        } else {

        }


        str += `
        <div class="col segment-lst">
            <div class="row">
                <div class="col-12 mb-2 d-flex justify-content-between">
                    <span class="stop-time"><strong>${stops == 1 ? `NonStop` : `${stops - 1} Stops`}</strong> • ${sia_duration(PaxJourney.Duration)}</span>
                    <div class="airline-info-block">
                        <img src="/images/Airline/Square/SQ.png" alt="" width="18" class="img-fluid ms-1"> 
                        <img src="/images/Airline/Square/SQ.PNG" alt="" width="18" class="img-fluid ms-1"> 
                    </div>
                </div>
                <div class="col-12 col-md-3 col-xl-3 col-lg-3">
                ${segStart}
                </div>
                <div class="col-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column">
                    <div class="d-flex flex-row align-items-center graphycs-div position-relative">
                        
                        <i class="mdi mdi-airplane fs-4"></i>      
                        <div class="graphics-line-horizontal"></div>
                        <div class="layover-stops d-flex position-absolute translate-middle-x start-50">
                            ${segMiddle}
                        </div>
                        <i class="mdi mdi-map-marker-radius"></i>
                    </div>
                </div>
                <div class="col-12 col-md-3 col-xl-3 col-lg-3">
                    ${segEnd}
                </div>
            </div>
        </div>`
    })

    $("#PaxJourneyList-info").html(`
    <div class="card">
        <div class="card-body border bg-primary bg-opacity-10">
            <div class="row list-item-main" >
                <div class="col-12 col-md-10 col-xl-10 col-lg-10">
                    <div class="row row-gap-2">
                        ${str}
                    </div>
                </div>
                <div class="col-12 col-md-3 col-xl-2 col-lg-2 px-0 text-center border-start d-flex justify-content-center align-items-center">
                    <div class="fare-button p-2">
                        <span class="text-primary fw-semibold">Economy Lite</span>
                        <h4 class="owd-amount-price mt-2">$ ${amount_format(Order.TotalPrice.TotalAmount['#text'])}</h4>
                        <div class="owd-amount-price-view"> 
                            <a class="view-btn link-secondary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#flightDetailOffcanvas" aria-controls="offcanvasRight" flts="${FLTs.toString()}" provider="ndcSIA">Flight Detail &gt;</a>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    `)

    str = ``
    var PaxList = []
    if (Response.DataLists?.PaxList?.Pax?.length) {
        $.each(Response.DataLists?.PaxList?.Pax, (n, e) => { PaxList.push(e) })

    } else if (Response.DataLists?.PaxList?.Pax) {
        PaxList.push(Response.DataLists?.PaxList?.Pax)
    }

    $.each(PaxList, (n, Pax) => {
        str += `
        <tr>
            <td>${(++n)}. ${Pax.PTC}</td>
            <td>${Pax?.Individual?.TitleName}</td>
            <td>${Pax?.Individual?.GivenName}</td>
            <td>${Pax?.Individual?.Surname}</td>
            <td>${Pax?.Individual?.Birthdate}</td>
            <td>
                <button class="btn btn-link btn-sm accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#FareRule_${Pax.PaxID}" aria-expanded="true" aria-controls="collapseOne">
                    Fare/Service
                </button>
            </td>
        </tr>`
        const [_FareDetail] = Order.OrderItem.FareDetail.filter((e) => e.PassengerRefs == Pax.PaxID)
        //parsing price
        if (_FareDetail) {

            // tab
            var tabs = `
            <ul class="nav nav-tabs mb-3 flex-nowrap overflow-x-auto overflow-y-hidden" id="fareruleTab" role="tablist">`
            var tabBody = `
            <div class="tab-content px-3" id="myTabContent">`
            var active = `active`

            var OtherDetails = `<div class="border-bottom py-2">`


            _FareDetail.FareComponent?.forEach((FareComponent) => {
                const _Service = Order.OrderItem.Service.filter((e) => e.ServiceID == `${FareComponent.SegmentRefs}_${Pax.PaxID}`)

                tabs += `
                <li class="nav-item" role="presentation">
                    <a class="nav-link d-flex align-items-center ${active}"  type="button" data-bs-toggle="tab" data-bs-target="#a_${Pax.PaxID}_${FareComponent.SegmentRefs}" aria-controls="farerulede_flight-tab-pane" aria-expanded="false">
                        <div class="airline_ico">
                            <i class="mdi mdi-airplane fs-3"></i>
                        </div>
                        <div class="ms-2 segment_detail text-start">
                            <div class="fw-bold">${DataLists[FareComponent.SegmentRefs].Dep.IATA_LocationCode} - ${DataLists[FareComponent.SegmentRefs].Arrival.IATA_LocationCode}</div>
                        </div>
                    </a>
                </li>`

                tabBody += `
                <div class="tab-pane fade ${active ? `show active` : ``}" id="a_${Pax.PaxID}_${FareComponent.SegmentRefs}" role="tabpanel"  tabindex="0">
                    <dl class="row mb-0">
                        <dt class="col-sm-3 border-bottom py-2">Fare Type</dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">${DataLists[FareComponent.PriceClassRef].Name}</dd>
                                
                        <dt class="col-sm-3 border-bottom py-2">Cabin Type</dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">${FareComponent.FareBasis?.CabinType?.CabinTypeName['#text']}</dd>
                        
                        <dt class="col-sm-3 border-bottom py-2">Fare Basis Code</dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">${FareComponent.FareBasis?.FareBasisCode?.Code}</dd>`

                // fare rules Penalty
                const Penalty = FareComponent.FareRules?.Penalty
                if (Penalty) {

                    if (Penalty.hasOwnProperty('@_CancelFeeInd'))
                        tabBody += `
                        <dt class="col-sm-3 border-bottom py-2">Cancellation/Refund </dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">${Penalty['@_CancelFeeInd']}</dd>
                    `
                    if (Penalty.hasOwnProperty('@_ChangeFeeInd'))
                        tabBody += `
                        <dt class="col-sm-3 border-bottom py-2">Itinerary Change </dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">${Penalty['@_ChangeFeeInd']}</dd>
                    `
                    tabBody += `
                        `
                    var rmk = ''
                    Penalty?.Details?.Detail.forEach((Detail) => {

                        Detail.Amounts?.Amount?.forEach((Amount) => {
                            rmk += parseFloat(Amount.CurrencyAmountValue['#text']) > 0 ? `<p class="text-primary" ><b>${Detail.Type}</b> - ${Amount.AmountApplication} - ${Amount.CurrencyAmountValue['#text']} ${Amount.CurrencyAmountValue['@_Code']} - ${Amount?.ApplicableFeeRemarks?.Remark}</p>` : ``
                        })

                    })
                    tabBody += rmk.trim() != '' ? `<dt class="col-sm-3 border-bottom py-2">Penalty Amount </dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">${rmk}</dd>` : ``

                    /*
                    Penalty?.Details?.Detail.forEach((Detail) => {
                        tabBody += `
                        <dt class="col-sm-3 border-bottom py-2">Penalty ${Detail.Type}</dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">`
                        var rmk = ''
                        Detail.Amounts?.Amount?.forEach((Amount) => {
                            if (parseFloat(Amount.CurrencyAmountValue['#text']) > 0) {
                                rmk = `<p class="text-primary" ><b>${Detail.Type}</b> - ${Amount.AmountApplication} - ${Amount.CurrencyAmountValue['#text']} ${Amount.CurrencyAmountValue['@_Code']} - ${Amount?.ApplicableFeeRemarks?.Remark}</p>` + rmk
                            } else {
                                rmk += `<p><b>${Amount.AmountApplication}</b> ${Amount.CurrencyAmountValue['#text']} ${Amount.CurrencyAmountValue['@_Code']} - ${Amount?.ApplicableFeeRemarks?.Remark}</p>`
                            }

                        })
                        tabBody += `
                            ${rmk}
                        </dd>`
                    })/crm/agent/1.0
                    */
                    _Service?.forEach((Service) => {
                        tabBody += `
                        <dt class="col-sm-3 border-bottom py-2">Service</dt>
                        <dd class="col-sm-9 border-bottom py-2 mb-0">Status: ${Service['StatusCode']} ${sia_service_to_string(Service?.ServiceAssociations?.ServiceDefinitionRef?.ServiceDefinitionRefID)}</dd>
                    `
                    })

                }


                tabBody += `        
                    </dl>
                </div>`
                active = ``
            })
            tabs += `
            </ul>`


            const Price = _FareDetail.Price || false
            if (Price) {
                OtherDetails += `
                       
                        BaseAmount ${Price.BaseAmount['#text']} + Tax ${Price.Taxes?.Total?.['#text']} = <b>${Price.TotalAmount?.DetailCurrencyPrice?.Total?.['#text']} ${Price.TotalAmount?.DetailCurrencyPrice?.Total?.['@_Code']}</b><br><b>Tax Breakdown: </b>`
                Price.Taxes?.Breakdown?.Tax.forEach((Tax) => {
                    OtherDetails += `${Tax.Nation}.${Tax.TaxCode} ${Tax.Amount['#text']} | `
                })
            }
            OtherDetails += `
                <p class="col-sm-12 pt-2 text-danger">`
            _FareDetail?.Remarks?.Remark.forEach((Remark) => {
                OtherDetails += `${Remark}</br>`
            })
            OtherDetails += `
                </p>`

            tabBody += `
            </div>`

            OtherDetails += `
            </div>`

            str += `
            <tr>
                <td colspan="6" class="accordion-collapse collapse" id="FareRule_${Pax.PaxID}"  data-bs-parent="#PaxList-info" >
                    <div class="accordion-body"> 
                        <div class="modal-body">
                            ${tabs}
                            ${tabBody}
                            ${OtherDetails}
                        </div>
                    </div>
                </td>
            </tr>`
        }

    })

    $("#PaxList-info").html(`
            <div class="traveller-info-sec" >
            <h4 class="mb-3 mt-3"><i class="mdi mdi-account-multiple-check-outline me-1"></i>Traveller Information</h4>
            <div class="card">
                <div class="card-body">
                    <table class="table table-centered mb-0">
                        <thead>
                            <tr>
                                <th>PAX Type</th>
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${str}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
            `);


    str = ``
    var ContactInfoList = []
    if (Response.DataLists?.ContactInfoList?.ContactInfo?.length) {
        $.each(Response.DataLists?.ContactInfoList?.ContactInfo, (n, e) => {
            ContactInfoList.push(e)
        })

    } else if (Response.DataLists?.ContactInfoList?.ContactInfo) {
        ContactInfoList.push(Response.DataLists?.ContactInfoList?.ContactInfo)
    }

    $.each(ContactInfoList, (n, ContactInfo) => {
        str += `
            <tr>
                <td>${ContactInfo?.ContactTypeText}</td>
                <td>${ContactInfo?.Phone?.CountryDialingCode || ``} ${ContactInfo?.Phone?.PhoneNumber || ``}</td>
                <td>${ContactInfo?.EmailAddress?.EmailAddressText || ``}</td>
            </tr>

            `
    })
    $("#ContactInfoList-info").html(`
            <div class="traveller-info-sec" >
            <h4 class="mb-3 mt-3"><i class="mdi mdi-account-multiple-check-outline me-1"></i>Traveller Contact Details</h4>
            <div class="card">
                <div class="card-body">
                    <table class="table table-centered mb-0">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${str}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
            `);


    // parsing FareDetail
    var FareDetail = []
    if (Order.FareDetail?.length > 0) {

    } else {

    }



    // parsing price-info
    const TotalPrice = Order.TotalPrice
    //console.log(Price)
    if (TotalPrice?.hasOwnProperty(`BaseAmount`)) {
        $('#price-info').append($(`
            <li class="list-group-item base-fare" >
            <a class="d-flex justify-content-between align-items-center link-secondary" data-bs-toggle="collapse" href="#baseFare" role="button" aria-expanded="false" aria-controls="baseFare">
                <span class="fw-normal title-cls">Base Fare</span>    
                <span class="fw-semibold totalbasefare price">$ ${amount_format(TotalPrice.BaseAmount['#text'])}<i class="ps-2 mdi mdi-chevron-down fs-4"></i></span>
            </a>
            <div class="collapse" id="baseFare">
                <div class="d-flex justify-content-between pt-2 align-items-center fs-6 text-secondary-emphasis">
                    <span>Adult(s) (1 X $1118.05)</span>
                    <span class="fw-normal totalbasefare price">$1118.05</span>
                </div>
            </div>
        </li>
            `))
    }

    if (TotalPrice?.hasOwnProperty(`TaxSummary`)) {
        $('#price-info').append($(`
        <li class="list-group-item base-fare" >
            <a class="d-flex justify-content-between align-items-center link-secondary" data-bs-toggle="collapse" href="#TaxSummary" role="button" aria-expanded="false" aria-controls="baseFare">
                <span class="fw-normal title-cls">Tax Summary Fare</span>    
                <span class="fw-semibold totalbasefare price">$ ${TotalPrice.TaxSummary?.TotalTaxAmount['#text']}<i class="ps-2 mdi mdi-chevron-down fs-4"></i></span>
            </a>
            <div class="collapse" id="TaxSummary">
                <div class="d-flex justify-content-between pt-2 align-items-center fs-6 text-secondary-emphasis">
                    <span>Adult(s) (1 X $1118.05)</span>
                    <span class="fw-normal totalbasefare price">$1118.05</span>
                </div>
            </div>
        </li>
            `))
    }

    if (TotalPrice?.hasOwnProperty(`TotalAmount`)) {
        $('#price-info').append($(`
            <!-- grand total charge fare -->
        <li class="list-group-item">
            <div class="d-flex justify-content-between">
                <span class="fs-5 fw-bold">
                    Total Amount</span>
                <span class="fs-5">
                    <span class="fw-bold">$ ${TotalPrice.TotalAmount?.['#text']}</span>
                </span>
            </div>
        </li>
        `))
    }












    ShoppingResponseID = Response?.ShoppingResponse?.ShoppingResponseID

    // parsing seagments
    var FLTs = []
    if (Response?.PricedOffer?.hasOwnProperty('Offer')) {

        const Order = Response.Order

        if (selectedOffer.JourneyOverview.JourneyPriceClass?.length > 0) {
            selectedOffer.JourneyOverview.JourneyPriceClass.forEach((JourneyPriceClass) => {
                FLTs.push(JourneyPriceClass.PaxJourneyRefID)
            })
        }
        else {
            FLTs.push(selectedOffer.JourneyOverview?.JourneyPriceClass.PaxJourneyRefID)
        }

        // parsing PaxJourneyList


        $(`#flight - info`).append($(`
            <div class="container list-item-inner  border bg-primary bg-opacity-10" >
                <div class="d-flex justify-content-between row align-items-center text-bg-light p-2">
                    <div class="col-12 col-md-10 col-xl-10 col-lg-10 p-2">
                        <div class="row row-gap-2">
                            ${sia_buildFTL(FLTs.toString())}
                        </div>
                    </div>

                    <div class="col-12 col-md-3 col-xl-2 col-lg-2 px-0 text-center border-start d-flex justify-content-center align-items-center">
                        <div class="fare-button p-2">
                            <span class="text-primary fw-semibold">${DataLists[selectedOffer.JourneyOverview.PriceClassRefID]?.['Name']}</span>
                            <h4 class="owd-amount-price mt-2">$ ${amount_format(selectedOffer.OfferItem.Price.TotalAmount['#text'])}</h4>
                            <div class="owd-amount-price-view">
                                <a class="view-btn link-secondary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#flightDetailOffcanvas" aria-controls="offcanvasRight" flts="${FLTs.toString()}" provider="ndcSIA" >Flight Detail &gt;</a>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
            `))
    }

    console.log(d);
}

function sia_buildFareDetail() {

}