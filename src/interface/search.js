const { html_doc } = require('./_components/html_doc')

module.exports = {
    index: (req, res, next) => {
        console.log('in search interface, do:index')
        res.send('index')
    },
    view: (req, res, next) => {
        console.log('in search interface, do:view')
        var _content = `
  
    <!-- Start Content-->
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Airlink</a></li>
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                            <li class="breadcrumb-item active">Search Flights</li>
                        </ol>
                    </div>
                    <h4 class="page-title"><i class="uil-search me-1"></i>Search Flights</h4>
                </div>
            </div>
        </div>
        <!-- end page title -->
       
        <!-- Portlet card -->
        <div class="card mb-md-0 mb-3">
            <div class="card-body">

                <div class="search-query row align-items-center" id="searched">
                    <div class="col-auto">
                        <h5 class="airports" >Melbourne (MEL) -  Delhi (DEL)</h5>
                    </div>
                    <div class="col-auto"> 
                        <div class="traveler" ><strong>Economy</strong> | 2 Adult, 1 Child</div>
                    </div>
                    <div class="col-auto">
                        <div class="ddate"><strong>Departure:</strong> 2023-12-05</div>
                    </div>
                    <div class="col-auto">
                        <div class="rdate"><strong>Return:</strong> 2023-12-05</div>
                    </div>
                    <div class="col-auto ms-auto">
                        <button type="submit" class="btn btn-primary ms-auto">
                            <i class="uil-search me-1"></i> <span>Update Search</span>
                         </button>
                    </div>    
                </div>
                                
                <div id="search_form" class="collapse show">
                <form id="searchFlight" action="${req?.params?.interface}/ndcSIA" method="post" >
                    <input type="hidden" name="do" value="flightAvailability" />
                    <div class="row mb-2 align-items-baseline row-gap-2">
                        <div class="col-lg-auto col-md-12 col-sm-12 select-journey">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input changeJType" type="radio" name="journeytype" id="oneway" value="oneway" checked autocomplete="off">
                                <label class="form-check-label" for="oneway">One-way</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input changeJType" type="radio" name="journeytype" id="rJournyCheck" value="return" autocomplete="off">
                                <label class="form-check-label" for="rJournyCheck">Return</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input changeJType" type="radio" name="journeytype" id="multicity" value="multicity" autocomplete="off">
                                <label class="form-check-label" for="multicity">Multi-city</label>
                            </div>
                            <a class="btn btn-light btn-sm addcity box multicity" id="addcity" style="display: none;">
                                <i class="mdi mdi-plus pe-1"></i>Add City
                            </a>

                        </div>
                        <div class="col-lg-auto col-md-auto col-sm-12 travellerno ms-lg-auto d-flex flex-wrap flex-lg-nowrap row-gap-2 column-gap-2">
                            <select class="form-select" name="provider" >
                                <option value="travelport" >TravelPort</option>
                                <option value="ndcSIA" selected>SIA-NDC</option>
                            </select>
                            <select class="form-select" name="Cabin" >
                                <option value="Economy" selected>Economy</option>
                                <option value="PremiumEconomy">Premium Economy</option>
                                <option value="Business">Business</option>
                                <option value="First">1st Class</option>
                            </select>  
                            <div class="dropdown" id="select-passanger">
                              <button class="dropdown-toggle form-control px-3" type="button" id="travellerInfo" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="ri-contacts-line me-1"></i>
                                  <span>1 Traveller(s)</span>
                              </button>
                              <div class="dropdown-menu p-2" aria-labelledby="travellerInfo">   
                                    <div class="mb-3">
                                        <label class="form-label mb-0">Select Adults</label>
                                        <p><small>(Age 12+ Years)</small></p>
                                        <input data-toggle="touchspin" data-bts-max="10" name="nAdt" value="1" data-btn-vertical="true" type="text">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label mb-0">Select Child</label>
                                        <p><small>(Age 2 - 11 Years)</small></p>
                                        <input data-toggle="touchspin" data-bts-max="10" name="nChd" value="0" data-btn-vertical="true" type="text">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label mb-0">Select Infants</label>
                                        <p><small>(Under 2 Years)</small></p>
                                        <input data-toggle="touchspin" data-bts-max="5" name="nInf" value="0" data-btn-vertical="true" type="text">
                                    </div>
                                   
                                    <button type="button" class="btn btn-primary" onclick="">Done</button>              
                              </div>
                            </div>
                          </div>
                    </div>
                    <div class="input-containers">
                        <fieldset id="oneway-fieldset" class="oneway return multicity">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="from" placeholder="From" name="from" value="MEL" />
                                        <label for="from">From?</label>
                                    </div>  
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="to" placeholder="To?" name="to" value="DEL" />
                                        <label for="to">To?</label>
                                    </div>   
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating mb-3 w-100 oneway box multicity">
                                        <input type="text" class="form-control departdate" id="departdate" data-toggle="date-picker" data-single-date-picker="true" name="deptDate">
                                        <label for="departdate">Depart</label>
                                    </div> 
                                    <div class="form-floating box mb-3 w-100 return" style="display: none;">
                                        <input type="text" class="form-control traveldate" id="traveldate"  data-toggle="date-picker" name="returnDate">
                                        <label for="traveldate">Depart to Return</span></label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset id="multicity-fieldset" class="multicity" disabled>
                        <div class="row multicity box" style="display: none;">
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" placeholder="From" />
                                    <label for="from">From?</label>
                                </div>  
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" placeholder="To?" />
                                    <label for="to">To?</label>
                                </div>   
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating mb-3 w-100">
                                    <input type="text" class="form-control departdate" id="departdate" data-toggle="date-picker" data-single-date-picker="true">
                                    <label for="departdate">Depart</label>
                                </div>  
                            </div>
                            <div class="col-md-1 d-flex align-items-center">
                                <div class="form-floating mb-3">
                                    <a class="btn btn-light btn-sm remove-city" id="removecity">
                                        <i class="mdi mdi-window-close pe-1"></i>remove</a>
                                </div>
                                
                            </div>
                        </div>
                    </fieldset>
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="d-md-flex align-items-center">
                                <div class="form-check form-switch me-2">
                                    <input type="checkbox" class="form-check-input" id="refundableFlight">
                                    <label class="form-check-label" for="refundableFlight">Refundable Flights</label>
                                </div>
                                <div class="form-check form-switch me-2">
                                    <input type="checkbox" class="form-check-input" id="nonstopFlight">
                                    <label class="form-check-label" for="nonstopFlight">Non Stop Flights</label>
                                </div>
                                <div class="form-check form-switch ">
                                    <input type="checkbox" class="form-check-input" id="gdsSpecialFlight">
                                    <label class="form-check-label" for="gdsSpecialFlight">GDS Special Return</label>
                                </div>
                                <div class="btn-sec ms-auto justify-content-between align-items-center">                             
                                    <button type="submit" class="btn btn-primary ms-auto">
                                       <span>Search Flights</span> <i class="uil-arrow-right ms-1"></i>
                                    </button>
                                </div>    
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div> <!-- end card-->
    </div> <!-- container -->
    
    <div class="row mt-3">
        <div class="col-xl-3" id="ui_filters" >
            <h4 class="mb-3"><i class="mdi mdi-filter-outline me-1"></i>Advanced Filter</h4>
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
                        <h4 class="card-title">Applied Filters</h4>
                        <span class="text-uppercase fs-6 text-primary fw-bold clear-fliter"><a href="#">clear all</a></span>
                    </div>
                    <ul class="applied-filter list-unstyled mb-0">
                        <li class="badge badge-primary-lighten rounded-pill d-inline-flex align-items-center flex-wrap me-1 mb-1"><span>Mel: 1 Stop</span> <i class="mdi mdi-close-circle lh-1 ms-1 fs-5"></i></li>
                        <li class="badge badge-primary-lighten rounded-pill d-inline-flex align-items-center flex-wrap me-1 mb-1"><span>Air India</span> <i class="mdi mdi-close-circle lh-1 ms-1 fs-5"></i></li>
                        <li class="badge badge-primary-lighten rounded-pill d-inline-flex align-items-center flex-wrap me-1 mb-1"><span>New Delhi</span> <i class="mdi mdi-close-circle lh-1 ms-1 fs-5"></i></li>
                    </ul> 
                </div>
            </div>
            
            <div class="card custom-collapse">
                <div class="card-body">
                    <div class="card-widgets">
                        <a data-bs-toggle="collapse" href="#returnJourny" role="button" aria-expanded="true" aria-controls="returnJourny" class=""><i class="mdi mdi-chevron-down"></i></a>
                    </div>
                    <h4 class="card-title mb-0">Return Journey</h4>
                    <div id="returnJourny" class="pt-2 mt-2 border-top collapse show" style="">
                        <h5>Stops From Ahmedabad</h5>
                        <div class="my-3 fs-6">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="customCheck1">
                                    <label class="form-check-label" for="customCheck1">Direct (10)</label>
                                </div>
                                <span>$1102</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="customCheck1">
                                    <label class="form-check-label" for="customCheck1">1 Stop (79)</label>
                                </div>
                                <span>$950</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="customCheck1">
                                    <label class="form-check-label" for="customCheck1">2+ Stop (177)</label>
                                </div>
                                <span>$809</span>
                            </div>    
                        </div>
                        <h5>Departure From Ahmedabad</h5>
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

                        <h5>Arrival at Melbourne</h5>
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
            <div class="card custom-collapse">
                <div class="card-body">
                    <div class="card-widgets">
                        <a data-bs-toggle="collapse" href="#airlinelist" role="button" aria-expanded="false" aria-controls="airlinelist"><i class="mdi mdi-chevron-down"></i></a>
                    </div>
                    <h4 class="card-title mb-0">Airlines</h4>
                    <div id="airlinelist" class="collapse pt-2 mt-2 show border-top">
                        <div class="mb-3 fs-6">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="airindia" checked="">
                                    <label class="form-check-label" for="airindia">Air India (31)</label>
                                </div>
                                <span>$1102</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="sgnAl">
                                    <label class="form-check-label" for="sgnAl">Singapore Airlines (15)</label>
                                </div>
                                <span>$950</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="thaiAl">
                                    <label class="form-check-label" for="thaiAl">Thai Airways (41)</label>
                                </div>
                                <span>$809</span>
                            </div>    
                        </div>
                        <h5>Layover Airports</h5>
                        <div class="my-3 fs-6">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="abudhabi">
                                    <label class="form-check-label" for="abudhabi">Abu Dhabi (7)</label>
                                </div>
                                <span>$1050</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="del" checked="">
                                    <label class="form-check-label" for="del">New Delhi (115)</label>
                                </div>
                                <span>$960</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="sng">
                                    <label class="form-check-label" for="sng">Singapore (105)</label>
                                </div>
                                <span>$809</span>
                            </div>  
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="sy">
                                    <label class="form-check-label" for="sy">Sydney (60)</label>
                                </div>
                                <span>$1210</span>
                            </div>  
                        </div>

                        <h5 class="mb-3">Layover Duration</h5>
                        <span class="irs irs--flat js-irs-0"><span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min" style="visibility: visible;">01h :40m</span><span class="irs-max" style="visibility: visible;">15h :00m</span><span class="irs-from" style="visibility: hidden;">0</span><span class="irs-to" style="visibility: hidden;">0</span><span class="irs-single" style="left: 36.0749%;">07h :30m</span></span><span class="irs-grid"></span><span class="irs-bar irs-bar--single" style="left: 0px; width: 44.0505%;"></span><span class="irs-shadow shadow-single" style="display: none;"></span><span class="irs-handle single" style="left: 41.6463%;"><i></i><i></i><i></i></span></span><input type="text" id="layover-slider" class="irs-hidden-input" tabindex="-1" readonly="">
                    </div>
                                                            
                </div>
            </div>
        </div>
        <div class="col-xl-9" id="flight_list_holder" >
            
        </div>
    </div>

<div class="booking_panel-bottom d-none sticky-bottom justify-content-between row bg-primary-lighten align-items-center text-bg-light p-2 border-top border-primary border-3" id="selected_product" >
    <div class="left-info col-md-9 d-flex flex-wrap row-gap-4 selected_product_holder">
        <!--
        <div class="flight__detail-inner px-4 flex-fill">
            <div class="bp_flight_title fw-bold mb-3 fs-5">Returning <span><a href="#" class="link-primary text-decoration-underline link-offset-2 fw-semibold ms-2 fs-6">Change Flight</a></span></div>
            <div class="bp-flight-content d-flex">
                <div class="bp-flight_description">
                    <div class="bp-flight_date fs-6">10 NOV (Thu)</div> 
                    <div class="bp-flight_hour fw-bold fs-4"><span>DEL 10:35</span></div>
                </div>
                <div class="bp-flight-content-wrap px-3 text-center">
                    <i class="mdi mdi-arrow-right-thin fs-4"></i>
                    <div class="bp-flight-time fs-6">18hrs 30mins</div>
                </div>
                <div class="bp-flight_description">
                    <div class="bp-flight_date fs-6">11 NOV (Fri)</div> 
                    <div class="bp-flight_hour fw-bold fs-4"><span>MEL 21:35</span></div>
                </div>
            </div>
        </div>
        -->
    </div>
    <!--
    <div class="right-info col-md-3 d-flex align-items-center justify-content-around act" >
        <div>
            <p class="mb-0">Total Fare (1 People)</p>
            <div class="fw-bold fs-3 text-primary"><span>$</span>1218.05</div>
        </div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#selectpassanger">Next Step</button>
    </div>
    -->
</div>






<!-
////////////////////////////////////////////////////////////////
/////////////// TP_components /////////////////////////////////
//////////////////////////////////////////////////////////////
-->




<!-- Flight detail popup -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="flightDetailOffcanvas" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header pb-0">
        <h3 class="offcanvasRightLabel fw-semibold">Flight Details</h3>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-0">
    </div>
</div>
<script src="/js/search/common.js"></script>
<script src="/js/search/travelport.js"></script>
<script src="/js/search/ndcSIA.js"></script>

    `
        var html = html_doc(req, res, next, _content)
        res.send(html)
    },
    createPNR: (req, res, next) => {
        console.log('in search interface, do:createPNR')
        var _content = `
        <!-- Start Content-->
        <div class="container-fluid">
            
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box">
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Airlink</a></li>
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                <li class="breadcrumb-item active">Add Passanger</li>
                            </ol>
                        </div>
                        <h4 class="page-title">Add Passanger Details</h4>
                    </div>
                </div>
            </div>
            <!-- end page title -->

            <!-- Start Content -->
            <div class="row">
                <div class="col-12 col-md-9">
                    
                    <div class="text-end pe-1 mb-1"><a class="link-primary text-decoration-underline link-offset-2" href="search.html"><i class="mdi mdi-chevron-left"></i>Back to Search</a></div>
                    <div class="selected_flight-info " id="selected_flight-info" ></div>
                    
                    <div class="traveller-info-sec">
                        <h4 class="mb-3 mt-3"><i class="mdi mdi-account-multiple-check-outline me-1"></i>Traveller Information</h4>
                        <form action="/${req?.params?.interface}/ndcSIA" method="post" id="create-pnr-form" >   
                        <div class="card">
                            <div class="card-body">
                                
                                <div class="passangerDetailSec" id="pax-info" >
                                    
                                    <div class="row">    
                                        <div class="col-12">
                                            <div class="border-bottom mb-2 pb-2 d-flex justify-content-between align-items-center">
                                                <h5 class="my-0 ">Passenger Details: </h5>
                                                <a class="nameformat text-decoration-underline link-offset-2" type="button" data-bs-placement="left" tabindex="0" data-bs-toggle="popover" data-bs-content="check name format" data-bs-title="name format">Name Format info<i class="mdi mdi-information-outline ps-1"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                
                            </div>
                        </div>
                        <div class="action-div mt-2 ms-auto text-end">
                            <button type="submit" class="btn btn-primary">Create PNR</button>
                        </div>
                        </form>
                    </div>
                </div>

                <!-- Start Price Info -->
                <div class="col-12 col-md-3">
                    <div class="sticky-top-sec">
                        <div class="totalfare-sec shadow">
                            <ul class="totalfare-ul list-group list-group-flush p-2" id="price-info" > </ul>
                            <ul class="list-unstyled px-2 pb-3">
                                <li><i class="mdi mdi-chevron-right mdi-18px pe-1"></i><a type="button" class="text-decoration-underline link-offset-2" data-bs-toggle="modal" data-bs-target="#farerules">Full fare rules and conditions</a></li>
                            </ul>
                        </div>
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
        
        <script src="/js/search/common.js"></script>
        <script src="/js/search/travelport.js"></script>
        <script src="/js/search/ndcSIA.js"></script>
        <script>
            fetchOfferPrice('${req.query.id}')
        </script>
        `;


        var html = html_doc(req, res, next, _content)
        res.send(html)
    },
    flightAvailability: async (req, res, next) => {
        var search_param = req.body;
        if (search_param.provider == 'travelport') {
            var response = await Travelport.flightAvailability(req, res, next)
        }
        return res.json(response);
        console.log('in search interface, do:search', response)
        res.json(response)
    },
    travelport: async (req, res, next) => {

        const Travelport = require('./_/providers/Travelport/index.js')
        const search_param = req.body;
        console.log(search_param)
        var tp_res = await Travelport[`${search_param.do}`](req, res, next);
        return res.json(tp_res)
    },
    ndcSIA: async (req, res, next) => {

        const SIA = require('./_/providers/SIA/index.js')
        const tp_res = await SIA[`${req?.body?.do || req?.query?.do || 'index'}`](req, res, next);
        return res.json(tp_res)
    }
}