
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

const OriginDestination_from_FLT = (FLTid) => {
    const FLT = DataLists[FLTid]
    const SEGs = convert2Array(FLT?.PaxSegmentRefID)
    // console.log('SEGs', DataLists[SEGs[0]], DataLists[SEGs[SEGs.length - 1]])
    const s = `(${(DataLists[SEGs[0]])?.Dep?.IATA_LocationCode} ${(DataLists[SEGs[(SEGs.length - 1)]])?.Arrival.IATA_LocationCode})`
    return s
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
                legGroup[s.toString()] = { FLTs: s.toString(), mPrice: mPrice, OfferIDs: [o.OfferID] }
            }

        })

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
                //console.log('K,v', k, v)
                $(`#${ShoppingResponseID}`).append(`
                    <li class="list-item accordion-item border-0 mb-2">
                        <div class="container list-item-inner border">
                            <div class="row list-item-main shadow">
                                <div class="col-12 col-md-10 col-xl-10 col-lg-10 p-2">
                                    <div class="row row-gap-2">
                                        ${sia_buildFTL(v.FLTs)}
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
                                                    <a class="link-primary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#flightDetailOffcanvas" aria-controls="offcanvasRight" FLTs=${v.FLTs} provider="ndcSIA" >Flight Details</a>
                                                </div>
                                                <div class="owd-amount-price-view"> 
                                                    <a class="view-btn link-secondary text-decoration-underline link-offset-1 fs-6 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#${v.FLTs}_ff" aria-expanded="true"><span class="view-detail">View</span><span class="hide-detail">Hide</span> ${v.OfferIDs?.length || ''} Offers</a>
                                                </div>
                                            </span>     
                                        </span>
                                    </div>
                                </div>  
                            </div>
                        </div>
                            <!-- Starts fare Details Html  -->
                            <div id="${v.FLTs}_ff" class="accordion-collapse show-detail mt-2 collapse" data-bs-parent="#departFlightList">
                            <!-- Depart flight details section -->
                                <div class="f-detail-sec depart-flight-info">
                                    <div class="row m-auto flight-header">
                                        <div class="col-12 p-0 position-relative table-responsive-lg d-flex justify-content-lg-end">
                                            <div class="select-flight__fare-table economy-tbl flex-grow-1 d-none">
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
                                                ${sia_bindFF(v.FLTs)}
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
    console.log("Offer.JourneyOverview.JourneyPriceClass", Offer.JourneyOverview.JourneyPriceClass)
    var FLTs = []

    const JourneyPriceClass = convert2Array(Offer.JourneyOverview.JourneyPriceClass)

    JourneyPriceClass.forEach((_JourneyPriceClass) => {
        const FLT = DataLists[_JourneyPriceClass.PaxJourneyRefID]
        const FF = DataLists[_JourneyPriceClass.PriceClassRefID]
        var journyStart
        var journyEnd

        $.each(convert2Array(FLT.PaxSegmentRefID), (n, SEGid) => {
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
    //console.log('i', i)
    const FLTs = i.split(',')

    $.each(FLTs, (i, FLTid) => {

        const FLT = DataLists[FLTid]

        var segStart //= FlightSegment.length
        var segMiddle = ''// = FlightSegment.length
        var segEnd = ''//= FlightSegment.length
        var stops = FLT.PaxSegmentRefID?.length || 0

        const PaxSegmentRefID = convert2Array(FLT?.PaxSegmentRefID)

        $.each(PaxSegmentRefID, (n, SEGid) => {
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
            if ((n == (FLT.PaxSegmentRefID?.length - 1)) || !FLT.hasOwnProperty('length')) {
                segEnd = `
                    <div class="fw-semibold text-uppercase fs-4 text-danger">${SEG.Arrival.IATA_LocationCode} <span>${(SEG.Arrival.AircraftScheduledDateTime).substr(11, 5)}</span></div>
                    <div class="fs-6">${sia_date(SEG.Arrival.AircraftScheduledDateTime)}</div>
                    <div class="fs-5 text-black d-none">${airportCity(SEG.Arrival.IATA_LocationCode)}</div>
                `
            }
        })



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
    var t = {}

    var str = ``
    $.each(legGroup[i].OfferIDs, (n, OfferID) => {

        const Offer = OffersGroup[OfferID]
        // parsing data
        const JourneyOverview = Offer.JourneyOverview

        // Baggage
        var Baggage = '<h4 class="text-start"><span class="badge text-bg-secondary"><i class="mdi mdi-bag-checked text-warning mdi-18px"></i> Baggage</span></h4>'
        convert2Array(Offer?.BaggageAllowance).forEach((_) => {
            const FBA = DataLists[_.BaggageAllowanceRefID]
            const kg = FBA?.WeightAllowance?.MaximumWeightMeasure?.['#text'] || false
            if (kg) {
                Baggage += `<p class="mb-1" > ${OriginDestination_from_FLT(_.PaxJourneyRefID)} : ${FBA.TypeCode} ${kg} Kg </p>`
            }
        })

        //Seat Selection

        // PenaltyRefID
        var Penalty = ` <h4 class="text-start"><span class="badge text-bg-secondary"><i class="mdi mdi-currency-usd text-warning mdi-18px"></i> Penalty</span></h5>`
        convert2Array(Offer?.PenaltyRefID).forEach((PENid) => {
            const PEN = DataLists[PENid]
            Penalty += `<p class="mb-1" ><b>${PEN.DescText} ${PEN.hasOwnProperty("PenaltyAmount") ? PEN.PenaltyAmount : ``}</b></p>`
        })

        // TC
        var seatSelection = ``
        var TC = ``
        convert2Array(JourneyOverview?.JourneyPriceClass).forEach((JourneyPrice) => {
            const FF = DataLists[JourneyPrice?.PriceClassRefID]
            TC += `<b>${OriginDestination_from_FLT(JourneyPrice?.PaxJourneyRefID)}</b>`
            convert2Array(FF?.Desc).forEach((_) => {
                if (_.DescID == "SEATSELECTION") {
                    seatSelection += `<p class="mb-1" >${OriginDestination_from_FLT(JourneyPrice?.PaxJourneyRefID)} : ${_.DescText}</p>`
                }
                TC += `<p class="mb-1" >${_.DescID} ${_.hasOwnProperty("DescText") ? _.DescText : ``}</p>`
            })
        })

        if (seatSelection != '') {
            seatSelection = `
            <h4 class="text-start"><span class="badge text-bg-secondary"><i class="mdi mdi-seat-recline-extra text-warning mdi-18px"></i> Seat Selection</span></h4>
            ${seatSelection}
            `
        }

        str += `
        <div class="select-flight__fare-table economy-tbl flex-grow-1">
            <div class="select-flight__fare-head-row">
                <div class="select-flight__fare-title-wrap economy-color fw-bold" >${DataLists[JourneyOverview.PriceClassRefID]?.['Name']}</div>
            </div>
            <div class="select-flight__fare-col select-flight__fare-col-footer-wrap">
                <div class="select-flight__fare-col-footer bg-body-tertiary">
                    <h4 class="select-flight__fare-footer-price">
                        $ ${amount_format(Offer.OfferItem.Price.TotalAmount)}
                    
                        <span class="fare-calculation fw-normal pe-1" type="button" data-bs-toggle="tooltip" data-bs-placement="left" aria-label="fare calculation" data-bs-original-title="fare calculation" title="fare detail" >
                            <i class="mdi mdi-information-outline" data-bs-toggle="offcanvas" data-bs-target="#fareDetailOffcanvas" aria-controls="offcanvasRight" OfferID="${OfferID}" provider="ndcSIA" title="fare detail" ></i>
                        </span>
                    </h4> 
                    <div class="d-none" style="overflow: auto" >${JSON.stringify(Offer?.OfferItem?.FareDetail)}</div>
                    <a tabindex="0" href="#" class="btn btn-outline-primary btn-sm select_fare x_sia_offer_select" OfferID=${Offer.OfferID} provider="ndcSIA" >Select</a>
                   

                </div>
            </div> 
            <div class="select-flight__fare-col summary-sec text-start">
                <div class="select-flight__fare-select"><span class="fare-select-text fw-bold text-start">${Baggage}</span></div> 
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold complimentary text-start">${seatSelection}</span>
                </div>
                <div class="select-flight__fare-select">
                    <span class="fare-select-text d-block fw-bold text-start">${Penalty}</span>
                </div>    
            </div> 
            <div class="select-flight__fare-col summary-sec d-none">
                
                <div class="select-flight__fare-select d-none">
                    <span class="fare-select-text d-block fw-bold">${TC}</span>
                </div>    
            </div>
        </div> 
        `
    })

    return str
}

function sia_buildFareDetails(OfferID) {

    var str = ``
    const Offer = OffersGroup[OfferID]
    // parsing data
    const JourneyOverview = Offer.JourneyOverview



    // PenaltyRefID
    const Penalty = convert2Array(Offer?.PenaltyRefID)
    if (Penalty.length > 0) {
        str += `
        <h4 class="at-flight-details-journey-title text-primary mb-3 fw-semibold bg-light p-2 d-flex justify-content-between align-items-center">
            <span><i class="mdi mdi-currency-usd pe-1"></i>Penalty</span>
            <span class="font-15 text-secondary fw-normal">Through journey</span>
        </h4>
        <table class="table fs-6">
        `

        Penalty.forEach((PENid) => {
            if (PENid.DescText == "Cancel not permitted")

                if (["Change not permitted", "Reissue permitted", "Cancel not permitted"].includes(PENid.DescText)) {

                }
            const PEN = DataLists[PENid]
            str += `<tr><th>${PEN.DescText}</th><td>${PEN.hasOwnProperty("PenaltyAmount") ? PEN.PenaltyAmount : ``}</td></tr>`
        })

        str += `</table>`
    }


    // TC
    var TC = convert2Array(JourneyOverview?.JourneyPriceClass)

    convert2Array(JourneyOverview?.JourneyPriceClass).forEach((JourneyPrice) => {
        const FF = DataLists[JourneyPrice?.PriceClassRefID]

        str += `
        <h4 class="at-flight-details-journey-title text-primary mb-3 fw-semibold bg-light p-2 d-flex justify-content-between align-items-center">
            <span><i class="mdi mdi-airplane pe-1"></i>${OriginDestination_from_FLT(JourneyPrice?.PaxJourneyRefID)}</span>
            <span class="font-15 text-secondary fw-normal">Seagment</span>
        </h4>
        <table class="table fs-6">
        `


        convert2Array(FF.Desc).forEach((_) => {
            str += `<tr><th>${_.DescID}</th><td>${_.hasOwnProperty("DescText") ? _.DescText : ``}</td></tr>`
        })
        str += `</table>`
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

        const PaxSegmentRefID = convert2Array(FLT?.PaxSegmentRefID)

        if (PaxSegmentRefID?.length > 0) {
            var journy = ``
            var journyStart
            var journyEnd
            var prev_Arrival = ``
            $.each(PaxSegmentRefID, (n, SEGid) => {
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
        const apiResp = JSON.parse(data?.apiResp)
        const OfferPriceRS = apiResp.Envelope?.Body?.OfferPriceRS

        if (OfferPriceRS?.hasOwnProperty('Error')) {
            alert(`${OfferPriceRS.Error?.[`DescText`]} `)
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
    if (_dList) {

        convert2Array(_dList?.['BaggageAllowanceList']?.['BaggageAllowance'])?.forEach((o) => DataLists[o['BaggageAllowanceID']] = o)
        convert2Array(_dList?.['OriginDestList']?.['OriginDest'])?.forEach((o) => DataLists[o['OriginDestID']] = o)
        convert2Array(_dList?.['PaxJourneyList']?.['PaxJourney'])?.forEach((o) => DataLists[o['PaxJourneyID']] = o)
        convert2Array(_dList?.['PaxSegmentList']?.['PaxSegment'])?.forEach((o) => DataLists[o['PaxSegmentID']] = o)
        convert2Array(_dList?.['PenaltyList']?.['Penalty'])?.forEach((o) => DataLists[o['PenaltyID']] = o)
        convert2Array(_dList?.['PriceClassList']?.['PriceClass'])?.forEach((o) => DataLists[o['PriceClassID']] = o)
        convert2Array(_dList?.['ServiceDefinitionList']?.['ServiceDefinition'])?.forEach((o) => DataLists[o['ServiceDefinitionID']] = o)
        convert2Array(_dList?.['PaxList']?.['Pax']).forEach((o) => {
            DataLists[o['PaxID']] = o
            paxList[o['PaxID']] = o
        })
        /*
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
*/
    }
    console.log('DataLists', DataLists)
}

function parseFilter() {
    console.log('OriginDestIDs', OriginDestIDs)
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

function sia_parseDataForCreatePNR(d) {

    //d = JSON.parse(d)
    const OfferPriceRS = d?.['apiResp']?.['Envelope']?.['Body']?.['OfferPriceRS']
    if (OfferPriceRS.hasOwnProperty('Error')) {
        $("#message_head").html(`
        <div class="col-lg-9">
            <div class="alert alert-danger alert-dismissible text-bg-danger border-0 fade show" role="alert">
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                [${OfferPriceRS.Error?.Code}] - ${OfferPriceRS.Error.DescText}.
            </div>
        </div
        `)
    } else if (OfferPriceRS.hasOwnProperty('Response')) {

        const Response = OfferPriceRS?.['Response']
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


            var str = ''
            var FareDetail = convert2Array(selectedOffer?.OfferItem?.FareDetail)

            if (FareDetail.length > 0) {
                const PAXID2str = (PassengerRefs) => {
                    var arr = []
                    console.log('PassengerRefs', PassengerRefs)
                    const PaxIds = PassengerRefs?.split(' ')
                    PaxIds.forEach((PaxID) => {
                        arr.push(DataLists[PaxID]?.['PTC'])
                    })
                    return arr.toString()
                }

                FareDetail.forEach((_FareDetail, FareDetailNumId) => {
                    console.log('_FareDetail', _FareDetail)
                    str += `
                    <tr>
                        <td>${PAXID2str(_FareDetail.PassengerRefs)}</td>
                        <td>${_FareDetail.Price?.BaseAmount?.['#text']}</td>
                        <td>${_FareDetail.Price?.Taxes?.Total?.['#text']}</td>
                        <td>${_FareDetail.Price?.TotalAmount?.DetailCurrencyPrice?.Total?.['#text']}</td>
                        <td>
                            <button class="btn btn-primary btn-sm align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#FareRule_${FareDetailNumId}" aria-expanded="false" aria-controls="collapseOne">
                                Fare/Service <i class="ps-1 mdi mdi-chevron-down"></i>
                            </button>
                        </td>
                    </tr>
                    `


                    // tab
                    var tabs = `
                    <ul class="nav nav-tabs flex-nowrap overflow-x-auto overflow-y-hidden border-bottom-0" style="margin-bottom:-1px" id="fareruleTab" role="tablist">`
                    var tabBody = `
                    <div class="tab-content px-3 bg-secondary-subtle border" id="myTabContent">`
                    var active = `active`

                    var OtherDetails = `<div class="py-2">`


                    _FareDetail.FareComponent?.forEach((FareComponent) => {

                        tabs += `
                        <li class="nav-item" role="presentation">
                            <a class="nav-link d-flex align-items-center ${active}"  type="button" data-bs-toggle="tab" data-bs-target="#a_${FareDetailNumId}_${FareComponent.SegmentRefs}" aria-controls="farerulede_flight-tab-pane" aria-expanded="false">
                                <div class="airline_ico">
                                    <i class="mdi mdi-airplane fs-3"></i>
                                </div>
                                <div class="ms-2 segment_detail text-start">
                                    <div class="fw-bold">${DataLists[FareComponent.SegmentRefs].Dep.IATA_LocationCode} - ${DataLists[FareComponent.SegmentRefs].Arrival.IATA_LocationCode}</div>
                                </div>
                            </a>
                        </li>`

                        tabBody += `
                        <div class="tab-pane fade ${active ? `show active` : ``}" id="a_${FareDetailNumId}_${FareComponent.SegmentRefs}" role="tabpanel"  tabindex="0">
                            <dl class="row mb-0">
                                <dt class="col-sm-3 border-bottom py-2">Fare Type</dt>
                                <dd class="col-sm-9 border-bottom py-2 mb-0">${DataLists[FareComponent.PriceClassRef]?.Name}</dd>
                                        
                                <dt class="col-sm-3 border-bottom py-2">Cabin Type</dt>
                                <dd class="col-sm-9 border-bottom py-2 mb-0">${FareComponent.FareBasis?.CabinType?.CabinTypeName['#text']}</dd>
                                
                                <dt class="col-sm-3 border-bottom py-2">Fare Basis Code</dt>
                                <dd class="col-sm-9 border-bottom py-2 mb-0">${FareComponent.FareBasis?.FareBasisCode?.Code}</dd>`

                        // fare rules Penalty
                        const Penalty = FareComponent.FareRules?.Penalty
                        const PenaltyRefs = FareComponent?.FareRules?.Penalty?.['@_refs']?.split(" ")
                        //console.log('Penalty>', Penalty)
                        if (PenaltyRefs.length > 0) {


                            var rmk = ''

                            PenaltyRefs.forEach((PenaltyRef) => {
                                if (DataLists.hasOwnProperty(PenaltyRef)) {
                                    const PenaltyDetail = DataLists[PenaltyRef]
                                    rmk += parseFloat(PenaltyDetail.PenaltyAmount?.['#text']) > 0 ? `<p class="" ><b>${(PenaltyDetail.ChangeFeeInd ? 'Change' : (PenaltyDetail.CancelFeeInd ? 'Cancel' : '--'))}</b> - <span class="text-decoration-underline link-offset-1 fw-semibold" >${PenaltyDetail.AppCode} - ${PenaltyDetail.PenaltyAmount['#text']} ${PenaltyDetail.PenaltyAmount['@_CurCode']}</span> - ${PenaltyDetail?.DescText}</p>` : ``
                                }
                            })
                            tabBody += rmk.trim() != '' ? `<dt class="col-sm-3 border-bottom py-2">Penalty Amount </dt>
                                <dd class="col-sm-9 border-bottom py-2 mb-0">${rmk}</dd>` : ``
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
                        OtherDetails += `<div class="fare-breakage" > BaseAmount ${Price.BaseAmount['#text']} + Tax ${Price.Taxes?.Total?.['#text']} = <b>${Price.TotalAmount?.DetailCurrencyPrice?.Total?.['#text']} ${Price.TotalAmount?.DetailCurrencyPrice?.Total?.['@_Code']}</b></div><b>Tax Breakdown: </b>`
                        Price.Taxes?.Breakdown?.Tax.forEach((Tax) => {
                            OtherDetails += `${Tax.Nation}.${Tax.TaxCode} ${Tax.Amount['#text']} | `
                        })
                    }


                    OtherDetails += `
                    <p class="pt-2 text-danger mb-0">`
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
                    <tr class="show-farerul" >
                        <td colspan="6" class="accordion-collapse collapse" id="FareRule_${FareDetailNumId}"  data-bs-parent="#PaxList-info" >
                            <div class="accordion-body"> 
                                <div class="modal-body">
                                    ${OtherDetails}
                                    ${tabs}
                                    ${tabBody}
                                </div>
                            </div>
                        </td>
                    </tr>`


                })


                $("#selected_Fare-Detail").html(`
                <div class="traveller-info-sec" >
                <h4 class="mb-3 mt-3"><i class="mdi mdi-account-multiple-check-outline me-1"></i>Fare Detail</h4>
                <div class="card">
                    <div class="card-body">
                        <table class="table table-centered mb-0">
                            <thead>
                                <tr>
                                    <th>PAX Type</th>
                                    <th>BaseAmount</th>
                                    <th>TotalTaxAmount</th>
                                    <th>TotalAmount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${str}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                `);
            }

            // parsing price-info
            const Price = selectedOffer.OfferItem?.Price
            //console.log(Price)
            if (Price?.hasOwnProperty(`BaseAmount`)) {
                $('#price-info').append($(`
                <li class="list-group-item base-fare">
                    <a class="d-flex justify-content-between align-items-center link-secondary" data-bs-toggle="collapse" href="#baseFare" role="button" aria-expanded="false" aria-controls="baseFare">
                        <span class="fw-normal title-cls">Base Fare</span>    
                        <span class="fw-semibold totalbasefare price">$ ${amount_format(Price.BaseAmount['#text'])}<i class="ps-2 mdi mdi-chevron-down fs-4 d-none"></i></span>
                    </a>
                    <div class="collapse d-none" id="baseFare">
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
                        <span class="fw-semibold totalbasefare price">$ ${Price.TaxSummary?.TotalTaxAmount['#text']}<i class="ps-2 mdi mdi-chevron-down fs-4 d-none"></i></span>
                    </a>
                    <div class="collapse d-none" id="TaxSummary">
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
            var str = ``
            if (paxList || false) {
                str += `
                    <div class="row">    
                        <div class="col-12">
                            <div class="border-bottom mb-2 pb-2 d-flex justify-content-between align-items-center">
                                <h5 class="my-0 ">Passenger Details: </h5>
                                <a class="nameformat text-decoration-underline link-offset-2" type="button" data-bs-placement="left" tabindex="0" data-bs-toggle="popover" data-bs-content="check name format" data-bs-title="name format">Name Format info<i class="mdi mdi-information-outline ps-1"></i></a>
                            </div>
                        </div>
                    </div>`
                //$(`#pax-info`).append($(str))


                for (const [PaxID, pax] of Object.entries(paxList)) {


                    str += `
                    <div class="row pb-2 mb-2">
                        <div class="col-md-1">
                            <h5><span>1</span>. ${pax.PTC}</h5>
                        </div>
                        
                        <div class="col-md-2 mb-2 mb-md-0">
                            <div class="form-floating">
                            <select class="form-select" name="PaxData[${PaxID}][title]" required>
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
                            <input class="form-control adult dob" type="text"  name="PaxData[${PaxID}][dob]" >
                            <label for="">DOB</label>
                            </div>
                        </div>
                    </div> 
                    `
                    //$(`#pax-info`).append($(str))
                }

                str += `
                <div class="passangerContactDetail">
                    <div class="row d-flex justify-content-between align-items-start">
                        <div class="col-12">
                            <h5 class="border-bottom mb-2 pb-2">Contact information:</h5>
                            <div class="alert alert-info font-14" role="alert">
                                <i class="ri-information-line me-1 align-middle"></i><strong>Note:</strong> All communication related to booking
                                will be sent to this email address and mobile.
                            </div>
                        </div>  
                    </div>
                    <div class="row">                                                                      
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 col-md-2 mb-2 mb-md-0">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" placeholder="" required="" name="contact[countrycode]" value="+61" > 
                                        <label for="">Country Code</label>
                                    </div>                                                                  
                                </div> 
                                <div class="col-12 col-md-4 mb-2 mb-md-0">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" placeholder="" required="" name="contact[phone]">
                                        <label for="">Mobile No</label>
                                    </div>                                                               
                                </div>
                                <div class="col-12 col-md-4 mb-2 mb-md-0">                         
                                    <div class="form-floating">
                                        <input type="email" class="form-control" placeholder="" id="email" required="" name="contact[email]">
                                        <label for="email">Email</label>
                                    </div>                                    
                                </div>                                          
                            </div>
                        </div>
                    </div>
                </div>
                `

                $(`#pax-info`).append($(
                    `
                    <div class="traveller-info-sec" style="" >
                        <h4 class="mb-3 mt-3"><i class="mdi mdi-account-multiple-check-outline me-1"></i>Traveller Information</h4>
                        <form action="${$(`#pax-info`).attr('action-url')}" method="post" id="create-pnr-form" >
                        <div class="card">
                            <div class="card-body">${str}</div>
                        </div>
                        <div class="action-div mt-2 ms-auto text-end">
                            <button type="submit" class="btn btn-primary">Create PNR</button>
                        </div>
                        </form>
                    </div>
                    `
                    )).find(".dob").daterangepicker({
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
            alert('Something went wrong [111]')
        }
    }
}



function sia_service_to_string(DataList_RefID) {
    var s = ``
    if (DataLists.hasOwnProperty(DataList_RefID)) {
        const ServiceDefinition = DataLists[DataList_RefID]
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

function build_PNRview(x) {
    console.log(x);
    var user_access = x.access
    console.log("user_access", user_access)
    var d = x.pnrdetails

    // parsing data for pnr view
    //const rsJson = JSON.parse(d?.OrderRetrieve?.rsJson)
    const Response = d?.OR_json?.['Envelope']?.['Body']?.['OrderViewRS']?.['Response']
    console.log('Response', d?.OrderRetrieve?.rsJson, Response)
    const Order = Response?.Order

    sia_parseDataList(Response?.['DataLists'])




    $("#BookingRef-info").html(`
        PNR: ${Order.OrderID}   
        <form class="d-inline-block" >
            <input type="hidden" name="do" value="" /> 
            <button type="button" class="btn-primary btn btn-sm ms-3"><i class="mdi mdi-refresh pe-1"></i>Retrieve PNR</button>
        </form>
        `)

    var str = ``
    var PaxJourneyList = convert2Array(Response.DataLists?.PaxJourneyList?.PaxJourney)

    var FLTs = []
    $.each(PaxJourneyList, (i, PaxJourney) => {
        FLTs.push(PaxJourney.PaxJourneyID)
        var segStart = ''//= FlightSegment.length
        var segMiddle = ''// = FlightSegment.length
        var segEnd = '' //= FlightSegment.length
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
    var PaxList = convert2Array(Response.DataLists?.PaxList?.Pax)
    var FareDetail = convert2Array(Order?.OrderItem?.FareDetail)

    $.each(PaxList, (n, Pax) => {
        str += `
        <tr>
            <td>${(++n)}. ${Pax.PTC}</td>
            <td>${Pax?.Individual?.TitleName}</td>
            <td>${Pax?.Individual?.GivenName}</td>
            <td>${Pax?.Individual?.Surname}</td>
            <td>${Pax?.Individual?.Birthdate}</td>
            <td>
                <button class="btn btn-primary btn-sm align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#FareRule_${Pax.PaxID}" aria-expanded="false" aria-controls="collapseOne">
                    Fare/Service <i class="ps-1 mdi mdi-chevron-down"></i>
                </button>
            </td>
        </tr>`

        const [_FareDetail] = FareDetail.filter((e) => e.PassengerRefs == Pax.PaxID)
        //parsing price
        if (_FareDetail) {

            // tab
            var tabs = `
            <ul class="nav nav-tabs flex-nowrap overflow-x-auto overflow-y-hidden border-bottom-0" style="margin-bottom:-1px" id="fareruleTab" role="tablist">`
            var tabBody = `
            <div class="tab-content px-3 bg-secondary-subtle border" id="myTabContent">`
            var active = `active`

            var OtherDetails = `<div class="py-2">`


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
                        <dd class="col-sm-9 border-bottom py-2 mb-0">${DataLists[FareComponent.PriceClassRef]?.Name}</dd>
                                
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
                            rmk += parseFloat(Amount.CurrencyAmountValue['#text']) > 0 ? `<p class="" ><b>${Detail.Type}</b> - <span class="text-decoration-underline link-offset-1 fw-semibold" >${Amount.AmountApplication} - ${Amount.CurrencyAmountValue['#text']} ${Amount.CurrencyAmountValue['@_Code']}</span> - ${Amount?.ApplicableFeeRemarks?.Remark}</p>` : ``
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
                OtherDetails += `<div class="fare-breakage" > BaseAmount ${Price.BaseAmount['#text']} + Tax ${Price.Taxes?.Total?.['#text']} = <b>${Price.TotalAmount?.DetailCurrencyPrice?.Total?.['#text']} ${Price.TotalAmount?.DetailCurrencyPrice?.Total?.['@_Code']}</b></div><b>Tax Breakdown: </b>`
                Price.Taxes?.Breakdown?.Tax.forEach((Tax) => {
                    OtherDetails += `${Tax.Nation}.${Tax.TaxCode} ${Tax.Amount['#text']};  `
                })
            }

            OtherDetails += `
                <p class="pt-2 text-danger mb-0">`
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
            <tr class="show-farerul" >
                <td colspan="6" class="accordion-collapse collapse" id="FareRule_${Pax.PaxID}"  data-bs-parent="#PaxList-info" >
                    <div class="accordion-body"> 
                        <div class="modal-body">
                            ${OtherDetails}
                            ${tabs}
                            ${tabBody}
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
                                <th> - </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${str}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `);

    str = ``
    var TicketDocInfos = convert2Array(Response?.TicketDocInfos?.TicketDocInfo)
    if (TicketDocInfos.length > 0) {
        str = ``

        $.each(TicketDocInfos, (n, TicketDocInfo) => {

            const doc_pax = DataLists[TicketDocInfo?.PassengerReference]?.Individual?.TitleName + ' ' + DataLists[TicketDocInfo?.PassengerReference]?.Individual?.GivenName + ' ' + DataLists[TicketDocInfo?.PassengerReference]?.Individual?.Surname + '<br>' + DataLists[TicketDocInfo?.PassengerReference]?.PTC
            var doc_seg = []
            $.each(convert2Array(TicketDocInfo?.TicketDocument?.CouponInfo), (n1, CouponInfo) => {
                let s = DataLists[CouponInfo?.CouponReference]?.Dep?.IATA_LocationCode + ' ' + DataLists[CouponInfo?.CouponReference]?.Arrival?.IATA_LocationCode

                if (CouponInfo.hasOwnProperty('AddlBaggageInfo')) {
                    s += ' ' + CouponInfo.AddlBaggageInfo?.CheckedFree?.['@_MaxBagWght']
                }
                doc_seg.push(s)
            })
            str += `
            <tr>
                <td>${TicketDocInfo?.TicketDocument?.TicketDocNbr || ``}<br>${TicketDocInfo?.TicketDocument?.Type || ``}</td>
                <td>${doc_pax}</td>
                <td><small>${doc_seg}</small></td>
                <td>${TicketDocInfo?.TicketDocument?.DateOfIssue || ``}</td>

                <td>${TicketDocInfo?.AgentIDs?.AgentID?.ID}<br>${TicketDocInfo?.TicketDocument?.ReportingType || ``}</td>
            </tr>
            `
        })
        $("#TicketDoc-info").html(`
            <div class="traveller-info-sec" >
                <h4 class="mb-3 mt-3"><i class="mdi mdi-account-multiple-check-outline me-1"></i>Tickets & EMDs </h4>
                <div class="card">
                    <div class="card-body">
                        <table class="table table-centered mb-0">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Pax</th>
                                    <th>Other</th>
                                    <th>IssueDate</th>
                                    <th>ReportingType</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${str}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            `);
    }


    var ContactInfoList = convert2Array(Response.DataLists?.ContactInfoList?.ContactInfo)
    if (ContactInfoList.length > 0) {
        str = ``

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
            </div>
            `);

    }
    // parsing FareDetail
    var FareDetail = []
    if (Order.FareDetail?.length > 0) {

    } else {

    }

    // parsing OrderStatus-info
    str = ``
    console.log(`Order`, Order.OrderItem)
    if ( Order.OrderItem?.StatusCode == "NOT ENTITLED") {
        str = `
        <div class="traveller-info-sec" >
            <h4 class="mb-3 mt-3"><i class="mdi mdi-account-multiple-check-outline me-1"></i>Order Item\s</h4>
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-4 cal-xl-3">
                            <small class="badge badge-primary-lighten">Order ID</small>
                            <h5>SQ_6QW7ND</h5>
                        </div>
                        <div class="col-lg-4 cal-xl-3">
                            <small class="badge badge-primary-lighten">Price Garuntee Time Limit</small>
                            <h5>${sia_date(Order.OrderItem?.PriceGuaranteeTimeLimitDateTime)}</h5>
                        </div>
                        <div class="col-lg-4 cal-xl-3">
                            <small class="badge badge-primary-lighten">Price</small>
                            <h5>${Order.OrderItem?.Price?.BaseAmount?.['#text']} + ${Order.OrderItem?.Price?.TaxSummary?.TotalTaxAmount?.['#text']} = <b>${Order.OrderItem?.Price?.TotalAmount?.['#text']} ${Order.OrderItem?.Price?.TotalAmount?.['@_CurCode']}</b></h5>
                        </div>
                        <div class="col-lg-12 cal-xl-3 text-end">
                            <form action="65dea3e81d2f7e4eeb111e5e/Issuance" method="post" class="PnrViewAction d-inline " >
                                <input type="hidden" name="pnrid" value="${d._id}" /> 
                                <input type="hidden" name="OfferID" value="${Order.OrderItem?.OrderItemID}" />
                                ${user_access.includes("t") ? `<button type="submit" class="btn btn-primary">Issue TKTT/EMD</button>` : ``}
                            </form>
                            <form action="65dea3e81d2f7e4eeb111e5e/CancelPnr" method="post" class="PnrViewAction d-inline " >
                                <input type="hidden" name="pnrid" value="${d._id}" /> 
                                <input type="hidden" name="OfferID" value="${Order.OrderItem?.OrderItemID}" />
                                ${user_access.includes("c") ? `<button type="submit" class="btn btn-primary" >Cancel</button>` : ``}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    } else {
        $('#AfterTicket-Actions').html(`
            <form action="65dea3e81d2f7e4eeb111e5e/CancelPnr" method="post" class="PnrViewAction d-inline " >
                <input type="hidden" name="pnrid" value="${d._id}" /> 
                <input type="hidden" name="OfferID" value="${Order.OrderItem?.OrderItemID}" />
                ${user_access.includes("c") ? `<button type="submit" class="btn btn-primary" >Cancel</button>` : ``}
            </form>
            ${user_access.includes("r") ? `<button type="button" class="btn btn-primary" onClick="javascript:alert('Coming Soon...')">Refund</button>` : ``}
            ${user_access.includes("r1") ? `<button type="button" class="btn btn-primary" onClick="javascript:alert('Coming Soon...')">Reissue</button>` : ``}
        </div>
        `)
    }
    $("#OrderStatus-info").html(str)

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
            <div class="collapse d-none" id="baseFare">
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
            <div class="collapse d-none" id="TaxSummary">
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

    if (1) {
        $("#Activity-info").html(`
        <div class="timeline-alt bg-body-secondary px-2">
            <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                <h5 class="m-0">Activity Log History</h5>
                <form action="/65dea3e81d2f7e4eeb111e5e/PnrActivityLog" class="d-inline-block" id="fetch_action_log" >
                    <input type="hidden" name="pnrid" value="${d._id}" />
                    <button type="submit" class="btn btn-primary btn-sm"><i class="mdi mdi-refresh me-1"></i>Refresh</button>
                </form>
            </div>
            <div class="history-details" data-simplebar data-simplebar-primary style="max-height: 450px;" id="activity_log" ></div>
        </div>
        `)
    }

    console.log(d);
}

