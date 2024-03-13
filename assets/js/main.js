

$(function () {

    /*
    $(".airportInput").autocomplete({ source: airports, minLength: 2, maxResults: 10 }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li class='list-group-item border-bottom' >")
            .append("<div>" + item.value + "</div>")
            .appendTo(ul);
    };
    */


    const paxInputModal = document.getElementById('PaxInput')
    paxInputModal?.addEventListener('show.bs.modal', event => {
        const paxContact = `
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">Email</label>
            <input type="email" class="form-control form-control-sm" placeholder="exampleemail@gmail.com">
          </div>
          <div class="col">
            <label class="form-label">Phone</label>
            <input type="text" class="form-control form-control-sm" placeholder="Phone">
          </div>
        </div>`;

        const paxDetail = `
        <div class="row">
          <div class="col-auto">
            <label class="form-label" for="autoSizingSelect">Title</label>
            <select class="form-select form-select-sm" id="autoSizingSelect">
              <option selected>Mr</option>
              <option selected>Mrs</option>
              <option value="1">Miss</option>
            </select>
          </div>
          <div class="col">
            <label class="form-label">FirstName</label>
            <input type="text" class="form-control form-control-sm" placeholder="FirstName">
          </div>
          <div class="col">
            <label class="form-label">LastName</label>
            <input type="text" class="form-control form-control-sm" placeholder="LastName">
          </div>
          <div class="col">
            <label class="form-label">DOB</label>
            <input type="text" class="form-control form-control-sm" placeholder="DOB">
          </div>
        </div> `;

        const nAdult = 2
        const nChild = 2
        const nInfant = 2
        var isleadPaxAdded = false;
        var nPax = 1
        var str = ''
        // add adult
        for (let i = 0; i < nAdult; i++) {
            str += `
        <div class="border rounded p-3 mb-3 bg-light">
            <h4 class="pb-3 "><span class="text-primary" >${(nPax++)}</span>. Pax <span class="text-danger" >ADT</span> ${!isleadPaxAdded ? '(Lead Passinger)' : ''}</h4>`
            if (!isleadPaxAdded) {
                str += paxContact
                isleadPaxAdded = true
            }
            str += paxDetail
            str += `
        </div>`;
        }

        // add Child
        for (let i = 0; i < nChild; i++) {
            str += `
        <div class="border rounded p-3 mb-3 bg-light">
            <h4 class=" pb-3 "><span class="text-primary" >${(nPax++)}</span>. Pax <span class="text-danger" >CHD</span> ${!isleadPaxAdded ? '(Lead Passinger)' : ''}</h4>`
            if (!isleadPaxAdded) {
                str += paxContact
                isleadPaxAdded = true
            }
            str += paxDetail
            str += `
        </div>`;
        }

        // add INF
        for (let i = 0; i < nInfant; i++) {
            str += `
        <div class="border rounded p-3 mb-3 bg-light">
            <h4 class=" pb-3 "><span class="text-primary" >${(nPax++)}</span>. Pax <span class="text-danger" >INF</span> ${!isleadPaxAdded ? '(Lead Passinger)' : ''}</h4>`
            if (!isleadPaxAdded) {
                str += paxContact
                isleadPaxAdded = true
            }
            str += paxDetail
            str += `
        </div>`;
        }

        $(paxInputModal).find('.modal-body').html(str)
    })


});



function returnJournyAdjust() {
    document.getElementById('rJournyInput').disabled = !document.getElementById('rJournyCheck').checked
}

$(document).ready(function () {


    $("input[name$='journeytype']").click(function () {
        var dreturn = $(this).val();

        $(".journeytypereturn").hide();
        $(".journeytype" + dreturn).show();
    });
    $("input[name$='journeytype']").click(function () {
        var multicity = $(this).val();

        $(".journeytypemulticity").hide();
        $(".journeytype" + multicity).show();
    });
});


$(window).on('load', function () {
    $('.preloader').hide();
});

// Javascript for tab



jQuery(document).ready(function () {

    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });
    $(".view-btn").click(function () {
        $(this).text(function (i, v) {
            return v === 'Hide Detail' ? 'View Detail' : 'Hide Detail'
        })
    });
    $('[data-quantity="plus"]').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        if (!isNaN(currentVal)) {
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    $('[data-quantity="minus"]').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            $('input[name=' + fieldName + ']').val(0);
        }
    });
});


$(document).ready(function () {
    $(".seatsAircraftSeat").popover({
        container: "body",
        title: '<div class="d-flex justify-content-between"><span>Select Seat</span><span class="closeSeatSelection" style="cursor:pointer;" onClick="a()" ><i class="fa-solid fa-xmark"></i></span></div>',
        content: `<div class="seatsPopoverDetails d-flex align-items-center mb-3">
                          <div class="seatsIconAvailable">
                              <div class="seatnumber fw-bold"></div>
                          </div>
                          <div class="seatsPopoverDetailsInfo ms-3">
                              <div class="seatsPopoverType">
                                  <span class="">Window Seat</span>
                              </div>
                              <div class="seatsPopoverPrice">
                                  <div class="test-inlinePrice">
                                      <div class="optionPriceCost fw-bold">$23.00</div>
                                  </div>
                              </div>
                          </div>
                         
                      </div>
                      <div class="seatsPopoverOptions">
                          <form>
                              <input type="hidden" id="seatno" class="seatno" name="seatno" value="3487">
                          <div class="seatsPopoverOption d-flex justify-content-between">
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="adult1" id="adult1" value="adult 1" checked autocomplete="off"/>
                                  <label class="form-check-label" for="adult1">adult 1</label>
                              </div> 
                              
                          </div>
                          <div class="seatsPopoverOption d-flex justify-content-between">
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="adult1" id="adult1" value="adult 1" autocomplete="off"/>
                                  <label class="form-check-label" for="adult1">adult 2</label>
                              </div> 
                              
                          </div>
                          </form>
                      </div>`,
        html: true,
        sanitize: false,
    });

    $(".closeSeatSelection").on("click", function (e) {
        $(".seatsAircraftSeat").popover("hide");
    });

    document.querySelectorAll(".seatAvailable").forEach((item) => {
        item.addEventListener("show.bs.popover", (event) => {
            $(".seatsAircraftSeat").popover("hide");
        });

        item.addEventListener("inserted.bs.popover", (event) => {
            const rowseat = event.target.getAttribute("row");
            const colseat = event.target.getAttribute("col");
            $(".seatno").val(`${rowseat}${colseat}`);
            $(".seatnumber").text(`${rowseat}${colseat}`);
        });
    });
});

function a() {
    $(".seatsAircraftSeat").popover("hide");
}

$(document).ready(function () {
    var addcity = 1;
    $('#flightsearch').on('click', '.addcity', function () {

        var data = `<div class="row mx-0 theme-border-radius mt-2 journeytypemulticity" id="addcitysec_${(addcity++)}">
            <div class="col-12 col-md-4 ps-0 mb-2 mb-xl-0 pe-0 pe-lg-2">
                <div class="form-group">
                    <i class="fa-solid fa-plane-departure h5 position-absolute"></i>
                    <input type="text" class="form-control ps-5" name="origin" placeholder="Origin" selected>
                </div>
            </div>
            <div class="col-12 col-md-4 ps-0 mb-2 mb-xl-0 pe-0 pe-lg-2">
                <div class="form-group">
                    <i class="fa-solid fa-plane-arrival h5 position-absolute"></i>
                    <input type="text" class="form-control ps-5" name="destination" placeholder="Destination">
                </div>
            </div>
            <div class="col-12 col-md-3 ps-0 mb-2 mb-xl-0 pe-0 pe-lg-0 pe-xl-2 d-flex">
                <div class="form-group pe-xl-2 w-100">
                    <i class="fa-regular fa-calendar-days h5 position-absolute"></i>
                    <span class="dep-date-input">
                        <input type="text" class="form-control ps-5 cal-input datepicker" name="ddate" placeholder="Depart Date">
                    </span>
                </div>
            </div>

            <div class="col-12 col-md-1 px-0 d-flex align-items-center">
                <a class="btn btn-outline-danger font-small me-2 remove-city" id="remove-city">
                    <i class="fa-solid fa-xmark pe-1"></i>
                    <span class="fw-bold">remove</span>
                </a>
            </div>
        </div>`;
        $(".formSection").append(data);
    });

    $('#flightsearch').on("click", ".remove-city", function (e) {
        e.preventdefault;
        $(this).closest(".journeytypemulticity").remove();
    });

});


// Function to group navigation items by "group" property
function groupNavigationItems(data) {

    const groupedItems = {};
    const mainNav = document.getElementById("mainNav");

    data.forEach(item => {
        const group = item.group || "-"; // Default to "Other" if no group is specified
        if (group == '-') {
            const li = document.createElement("li");
            li.className = 'side-nav-item'
            li.innerHTML = `
                <a class="side-nav-link" href="/${item._id}" >
                    <i class="ri-bubble-chart-line"></i>
                    <span>${item.path}</span>
                </a>`;

            mainNav.appendChild(li);
        }
        else {

            if (!groupedItems[group]) {
                groupedItems[group] = [];
            }
            groupedItems[group].push(item);
        }
    });
    return groupedItems;
}

// Function to create and render the grouped navigation menu
function renderGroupedNavigationMenu(data) {
    console.log(data)
    const mainNav = document.getElementById("mainNav");
    const groupedItems = groupNavigationItems(data);
    var nGroup = 0;
    for (const group in groupedItems) {
        const groupItems = groupedItems[group];
        const li = document.createElement("li");
        li.className = 'side-nav-item'
        //li.addClass('mb-4')
        var str = `
        <a data-bs-toggle="collapse" href="#a${++nGroup}" aria-controls="#a${nGroup}" aria-expanded="false" class="side-nav-link" >
            <i class="ri-play-mini-fill"></i>
            <span>${group}</span>
            <span class="menu-arrow"></span>
        </a>
        <div class="collapse" id="a${nGroup}">
            <ul class="side-nav-second-level">`

        groupItems.forEach(item => {
            str += `
                <li>
                    <a href="/${item._id}" class="">
                        <span>${item.disp_name}<span>
                    </a>
                </li>`
        })
        str += `
            </ul>
        </div>`

        li.innerHTML = str;
        mainNav.appendChild(li)
    }
}

// Call the function to render the grouped navigation menu



const airports = ["AAR - Aarhus", "ABD - Abadan", "AEH - Abeche", "ABZ - Aberdeen", "ABR - Aberdeen SD", "ABJ - Abidjan", "ABI - Abilene TX", "AUH - Abu Dhabi - Abu Dhabi International", "ABV - Abuja - Nnamdi Azikiwe International Airport", "AUE - Abu Rudeis", "ABS - Abu Simbel", "ACA - Acapulco", "ACC - Accra - Kotoka International Airport", "ADA - Adana", "ADD - Addis Ababa - Bole International Airport", "ADL - Adelaide", "ADE - Aden - Aden International Airport", "ADF - Adiyaman", "AER - Adler\/Sochi", "AJY - Agades", "AGA - Agadir", "SUM - Agana (Hagatna)", "AGZ - Aggeneys", "BQN - Aguadilla", "AGU - Aguascaliente", "AMD - Ahmedabad", "AYU - Aiyura", "AJA - Ajaccio", "AXT - Akita", "AKT - Akrotiri - RAF", "ADX - Aktyubinsk", "AAN - Al Ain", "AAC - Al Arish", "ALH - Albany", "ALB - Albany NY - Albany International Airport", "LBI - Albi", "AAL - Alborg", "ABQ - Albuquerque NM", "ABX - Albury", "ACI - The Blaye Airport ", "ALP - Aleppo", "AES - Alesund", "ALJ - Alexander Bay - Kortdoorn", "HBH - Alexandria - Borg el Arab Airport", "ALY - Alexandria - El Nhouza Airport", "ESF - Alexandria - Esler Field ", "ROM - Rome", "ALG - Algiers Houari Boumediene Airport", "AHU - Al Hoceima", "ALC - Alicante", "ASP - Alice Springs", "ADY - Alldays", "ALA - Almaty (Alma Ata) - Almaty International Airport", "LEI - Almeria", "ALF - Alta", "AAT - Altay", "ACH - Altenrhein", "AOO - Altoona PA", "ASJ - Amami", "AMA - Amarillo TX", "AZB - Amazon Bay", "AMM - Amman - Queen Alia International Airport", "ADJ - Amman - Amman-Marka International Airport", "ATQ - Amritsar", "AMS - Amsterdam - Amsterdam Airport Schiphol", "QNB - Anand", "ANC - Anchorage AK - Ted Stevens Anchorage International", "MIL - Milan", "ALV - Andorra La Vella - Heliport", "AXA - Anguilla", "AJN - Anjouan - Anjouan Airport", "ANK - Ankara", "ESB - Ankara - Esenboga International Airport", "AAE - Annaba", "ARB - Ann Arbor MI", "NCY - Annecy", "ANB - Anniston AL", "AYT - Antalya", "TNR - Antananarivo (Tanannarive) - Ivato International Airport", "ANU - Antigua V.C. Bird International", "ANR - Antwerp", "AOJ - Aomori", "APW - Apia - Faleolo International Airport", "ATW - Appelton\/Neenah\/Menasha WI", "AQJ - Aqaba", "AJU - Aracaju", "ARH - Arkhangelsk", "ARK - Arusha", "GPA - Araxos", "RLT - Arlit", "AXS - Armenia", "ACE - Arrecife\/Lanzarote", "AUA - Aruba - Reina Beatrix International Oranjestad", "AVL - Asheville NC", "ASM - Asmara International", "ASE - Aspen Snowmass CO", "ATZ - Assiut", "TSE - Astana - Astana International Airport", "ASU - Asuncion - Asuncion International Airport", "ASW - Aswan - Daraw Airport", "ATH - Athens", "HEW - Athens Hellinikon Airport", "AHN - Athens GA", "ATO - Athens OH", "ACY - Atlantic City NJ - Atlantic City International", "AKL - Auckland - Auckland International Airport", "AGB - Augsburg - Muehlhausen (Munic)", "AUG - Augusta ME - Augusta State Airport", "AUR - Aurillac", "AYW - Ayawasi", "AYQ - Ayers Rock - Connellan", "AYR - Ayr", "AUS - Austin TX - Austin-Bergstrom Airport", "CAK - Akron OH", "ABY - Albany GA", "ABE - Allentown PA", "ASB - Ashgabat Ashkhabat - Saparmurat Turkmenbashy International Airport", "ATL - Atlanta GA - Hartsfield Atlanta International Airport", "YAT - Attawapiskat NT", "AGS - Augusta GA", "BJZ - Badajoz", "BGW - Bagdad ", "SDA - Bagdad - International Airport", "IXB - Bagdogra", "NAS - Bahamas - Lynden Pindling International Airport", "BHV - Bahawalpur", "BAH - Bahrain - Bahrain International Airport", "BAK - Baku - Heydar Aliyev International Airport", "BNK - Ballina", "ABM - Bamaga", "BKO - Bamako - Bamako-Senou International Airport", "BBY - Bambari", "BWN - Bandar Seri Begawan - Brunei International Airport", "BDO - Bandung - Husein Sastranegara International Airport", "BLR - Bangalore", "BGU - Bangassou", "BGF - Bangui - MPoko International Airport", "BJL - Banjul - Banjul International Airport (Yundum International)", "BNP - Bannu", "BCN - Barcelona", "BLA - Barcelona", "BDU - Bardufoss", "VCE - Venice", "BZL - Barisal", "BDQ - Civil Airport Harni - Vadodara", "BRR - Barra (the famous tidal beach landing)", "BAQ - Barranquilla", "BSL - Basel", "EAP - Basel\/Mulhouse", "PTP - Basse-Terre - Pointe-a-Pitre International Airport", "SKB - Basseterre - Robert L. Bradshaw International Airport", "BIA - Bastia", "BYU - Bayreuth - Bindlacher-Berg", "EIS - Beef Island - Terrance B. Lettsome", "PEK - Beijing", "NAY - Beijing - Nanyuan Airport", "BEW - Beira", "BEY - Beirut - Beirut Rafic Hariri International Airport", "BEL - Belem", "BHD - Belfast - Harbour", "BFS - Belfast - Belfast International Airport", "IXG - Belgaum", "BEG - Belgrad (Beograd) - Belgrade Nikola Tesla International", "BZE - Belize City - Philip S.W.Goldson International", "CNF - Belo Horizonte", "BEB - Benbecula", "BEN - Benghazi (Bengasi)", "BUG - Bengueka", "BBT - Berberati", "BGO - Bergen", "EGC - Bergerac - Roumanieres", "BER - Berlin", "BDA - Bermuda - L.F. Wade International Airport", "BHO - Bhopal", "BBI - Bhubaneswar", "BIQ - Biarritz", "BLL - Billund", "BTU - Bintulu", "IRO - Biraro", "BHX - Birmingham - Birmingham International Airport", "FRU - Bishkek - Manas International Airport", "BXO - Bissau - Osvaldo Vieiro International Airport", "BLK - Blackpool", "BLT - Blackwater", "BLZ - Blantyre - Chileka", "BHE - Blenheim", "BFN - Bloemfontein - Bloemfontein Airport", "BVB - Boa Vista", "BOY - Bobo\/Dioulasso", "BOO - Bodo", "BJV - Bodrum - Milas Airport", "BOG - Bogota - El Nuevo Dorado International Airport", "BOI - Boise ID - Boise Air Terminal", "BFL - Bakersfield CA", "BKK - Bangkok Suvarnabhumi International", "BGR - Bangor ME", "BSR - Basra Basrah", "BTR - Baton Rouge LA - Baton Rouge Metropolitan Airport", "BPT - Beaumont Pt. Arthur TX", "BKW - Beckley WV", "BLI - Bellingham WA", "BJI - Bemidji MN", "BEH - Benton Harbour MI", "SXF - Berlin Schoenefeld", "TXL - Berlin Tegel", "THF - Berlin Tempelhof", "BRN - Berne Bern-Belp", "ZDJ - Berne Railway Service", "BET - Bethel AK", "BIO - Bilbao", "BHM - Birmingham AL", "BIS - Bismarck ND - Bismarck Municipal Airport", "BMI - Bloomington IL", "BMG - Bloomington IN", "BLF - Bluefield WV", "BLQ - Bologna", "BOM - Bombay (Mumbai) - Chhatrapati Shivaji International", "BON - Bonaire", "BOB - Bora Bora", "BOD - Bordeaux - Bordeaux Airport", "BYK - Bouake Cote d", "BOJ - Bourgas\/Burgas", "BOH - Bournemouth", "ZBO - Bowen", "BMP - Brampton Island", "BSB - Brasilia - President Juscelino Kubitschek International Airport", "BTS - Bratislava - M. R. Stefnnik Airport", "BZV - Brazzaville - Maya-Maya Airport", "BRE - Bremen - Bremen Airport (Flughafen Bremen)", "BES - Brest", "BIV - Bria", "BGI - Bridgetown - Grantley Adams International", "BDS - Brindisi", "BNE - Brisbane", "BRS - Bristol", "BNN - Broennoeysund", "BHQ - Broken Hill", "BME - Broome", "BRU - Brussels - Brussels Airport", "BGA - Bucaramanga", "BUH - Bucharest", "OTP - Bucharest - Henri Coanda International Airport", "BUD - Budapest - Budapest Ferihegy International Airport", "BUE - Buenos Aires", "BFO - Buffalo Range", "BJM - Bujumbura - Bujumbura International Airport", "BUQ - Bulawayo", "BDB - Bundaberg", "BWT - Burnie (Wynyard)", "YVB - Bonaventure PQ", "BXS - Borrego Springs CA", "BOS - Boston MA - General Edward Lawrence Logan", "BZN - Bozeman MT", "BFD - Bradford Warren PA Olean NY", "BRD - Brainerd MN", "BDR - Bridgeport CT", "BKX - Brookings SD", "BQK - Brunswick GA", "EZE - Buenos Aires Ezeiza International Airport", "AEP - Buenos AiresJorge Newbery", "BUF - Buffalo Niagara Falls NY", "BHC - Bullhead City NV", "BUR - Burbank CA", "BTV - Burlington VT", "BTM - Butte MT", "CAB - Cabinda", "CAG - Cagliari", "CNS - Cairns", "CAI - Cairo - Cairo International Airport", "CJC - Calama - El Loa", "YYC - Calgary - Calgary International Airport", "CLO - Cali", "CCJ - Calicut", "CLY - Calvi", "YCB - Cambridge Bay", "CBG - Cambrigde", "CAL - Campbeltown", "CGR - Campo Grande", "CBR - Canberra - Canberra Airport", "CUN - Cancun", "CIW - Canouan (island) - Canouan Airport", "CPT - Cape Town - Cape Town International Airport", "CCS - Caracas - Simon Bolivar International Airport", "CWL - Cardiff - Cardiff Airport", "CVQ - Carnarvon", "CRF - Carnot", "LRM - Casa de Campo\/La Romana", "CAS - Casablanca", "CSI - Casino", "CST - Castaway", "CTG - Catagena", "SLU - Castries - George F. L. Charles Airport \/St. Lucia Vigle", "CTA - Catania", "CAY - Cayenne - Cayenne-Rochambeau Airport", "CBU - Cottbus", "CED - Ceduna", "CES - Cessnock", "KHV - Chabarovsk (Khabarovsk)", "CMF - Chambery", "IXC - Chandigarh - Chandigarh International Airport", "CHQ - Chania", "CXT - Charters Towers", "CNX - Chiang Mai - Chiang Mai International Airport", "QCB - Chiba City", "ORD - Chicago IL O Hare International Airport", "CZA - Chichen Itza", "JKH - Chios", "CIP - Chipata", "KIV - Chisinau - Chisinau International Airport", "HTA - Chita (Tschita)", "CJL - Chitral", "CGP - Chittagong", "CHC - Christchurch", "CXI - Christmas Line", "CCZ - Chub Cay", "YYQ - Churchill", "CFG - Cienfuegos", "CME - Ciudad Del Carmen", "CGU - Ciudad Guayana", "CJS - Ciudad Juarez", "CEN - Ciudad Obregon", "CVM - Ciudad Victoria", "CMQ - Clermont", "CFE - Clermont Ferrand", "CBB - Cochabamba", "COK - Cochin", "CFS - Coffs Harbour", "CJB - Coimbatore", "CLQ - Colima", "KCE - Collinsville", "CGN - Cologne - Cologne International Airport (Flughafen Koln\/Bonn)", "CMB - Colombo - Bandaranaike International Airport", "CKY - Conakry - Conakry International Airport", "CZL - Constantine", "CND - Constanta (Constanza) - Constanta International Airport", "CPD - Coober Pedy", "CTN - Cooktown", "OOM - Cooma", "CPH - Copenhagen - Copenhagen Airport", "COR - Cordoba", "ODB - Cordoba", "CFU - Corfu", "ORK - Cork", "COO - Cotonou - Cotonou Cadjehoun Airport", "CVT - Coventry - Baginton", "CZM - Cozmel", "CGB - Cuiaba", "CUL - Culiacan", "CUR - Curacao - Curacao International Airport", "CWB - Curitiba", "CYU - Cuyo", "CLD - Carlsbad CA", "CSN - Carson City NV", "CMN - Casablanca Mohamed V", "CPR - Casper WY", "CDC - Cedar City UT", "CID - Cedar Rapids IA", "CMI - Champaign IL", "CGQ - Changchun Jilin", "CHG - Chaoyang Beijing - Chaoyang Airport", "CRW - Charleston WV - Yeager Airport", "CLT - Charlotte NC", "CHO - Charlottesville VA", "CHA - Chattanooga TN", "CTU - Chengdu - Shuangliu Sichuan", "CYS - Cheyenne WY - Cheyenne Regional Airport", "MDW - Chicago IL Midway", "CHI - Chicago IL", "CIC - Chico CA", "CUU - Chihuahua Gen Fierro Villalobos", "CKG - Chongqing - Jiangbei International Airport Sichuan", "CVG - Cincinnati OH - Cincinnati\/Northern Kentucky International", "CKB - Clarksburg WV", "BKL - Cleveland OH Burke Lakefront", "CLE - Cleveland OH Hopkins", "COD - Cody\/Powell\/Yellowstone WY", "KCC - Coffmann Cove AK", "CLL - College Station\/Bryan TX", "COS - Colorado Springs CO", "CAE - Columbia SC", "CSG - Columbus GA", "CMH - Columbus OH - Port Columbus International Airport", "CCR - Concord CA - Concord Municipal Airport", "CRP - Corpus Christi TX", "CGA - Craig AK", "CEC - Crescent City CA", "DKR - Dakar - Leopold Sedar Senghor International Airport", "DLM - Dalaman", "DBY - Dalby", "DLC - Dalian - Zhoushuizi International Airport Liaoning", "DAL - Dallas TX Love Field", "DFW - Dallas\/Ft. Worth TX - Dallas\/Fort Worth International Airport", "DJO - Daloa Cote d", "DAM - Damascus International", "DMM - Dammam King Fahad International", "DAN - Danville VA", "DAR - Dar es Salam (Daressalam) - Julius Nyerere International", "DRW - Darwin", "DDI - Daydream Island", "DAY - Dayton OH", "DAB - Daytona Beach FL", "DEC - Decatur IL", "YDF - Deer Lake\/Corner Brook", "DEL - Delhi - Indira Gandhi International Airport", "HAG - Den Haag (The Hague)", "DNZ - Denizli", "DPS - Denpasar\/Bali", "DEN - Denver CO - Denver International Airport", "DSK - Dera Ismail Khan", "DRB - Derby", "LDY - Derry (Londonderry - Eglinton)", "DSM - Des Moines IA - Des Moines International Airport", "DET - Detroit MI Coleman A. Young Municipal", "DTW - Detroit MI Wayne County Airport", "DTT - Detroit MI Metropolitan Area", "DVL - Devils Lake ND", "DPO - Devonport", "DHA - Dhahran", "DAC - Hazrat Shahjalal International Airport, Dhaka", "DIL - Dili - Nicolau Lobato International Airport", "DLG - Dillingham AK", "DNR - Dinard", "DLP - Disneyland Paris", "DJE - Djerba", "JIB - Djibouti (city) - Djibouti-Ambouli International Airport", "DOD - Dodoma - Dodoma Airport", "DOH - Doha - Doha International Airport", "CFN - Donegal (Carrickfin)", "DGM - Dongguan Guangdong", "DTM - Dortmund", "DHN - Dothan AL", "DLA - Douala", "DRS - Dresden - Dresden Airport", "DXB - Dubai - Dubai International Airport", "DBO - Dubbo", "DUB - Dublin - Dublin International Airport", "DUJ - Dubois PA", "DBQ - Dubuque IA", "DUS - Duesseldorf - Dusseldorf International Airport", "DLH - Duluth MN\/Superior WI", "DND - Dundee", "DUD - Dunedin", "DKI - Dunk Iceland", "DRO - Durango CO", "DUR - Durban", "DYU - Dushanbe (Duschanbe) - Dushanbe Airport", "DUT - Dutch Harbor AK", "DYA - Dysart", "DZA - Dzaoudzi", "DBV - Dubrovnik Croatia ", "ELS - East London", "IPC - Easter Island", "YEA - Edmonton", "EGS - Egilsstadir", "EIN - Eindhoven", "AZS - Elazig", "ETH - Elat", "VDA - Elat Ovula", "EKI - Elkhart IN", "EKO - Elko NV", "ELL - Ellisras", "EMY - El Minya", "ELM - Elmira NY", "ELP - El Paso TX - El Paso International Airport", "ELY - Ely NV", "EDR - Emerald", "EMD - Emerald", "ENF - Enontekioe", "EBB - Entebbe - Entebbe International Airport", "ERF - Erfurt - Erfurt Airport (Flughafen Erfurt)", "ERI - Erie PA", "EVN - Eriwan (Yerevan Jerevan)", "ERC - Erzincan", "ERZ - Erzurum", "EBJ - Esbjerg", "ESC - Escabana MI", "EPR - Esperance", "EUG - Eugene OR", "ACV - Eureka CA", "EVV - Evansville IN", "EVE - Evenes", "EXT - Exeter", "EAU - Eau Clarie WI", "EDI - Edinburgh - BAA Edinburgh AirportScotland", "YEG - Edmonton International", "YXD - Edmonton Municipal", "EBA - Elba Island Marina Di Campo", "FAI - Fairbanks AK", "FIE - Fair Isle (Shetland)", "LYP - Faisalabad", "FAR - Fargo ND MN", "FMN - Farmington NM", "FAO - Faro", "FAE - Faroer - Vagar Airport", "FYV - Fayetteville AR", "FAY - Fayetteville\/Ft. Bragg NC", "FEZ - Fes", "FSC - Figari", "FLG - Flagstaff AZ", "YFO - Flin Flon", "FNT - Flint MI", "FLR - Florence (Firenze) - Peretola Airport", "FLO - Florence SC", "FLN - Florianopolis", "FRO - Floro", "YFA - Fort Albert", "FDF - Fort de France - Martinique Aime Cesaire International", "FOD - Fort Dodge IA", "FHU - Fort Huachuca\/Sierra Vista AZ", "FLL - Fort Lauderdale\/Hollywood FL", "YMM - Fort McMurray", "FMY - Fort Myers Metropolitan Area FL", "RSW - Fort Myers Southwest Florida Reg FL", "FRI - Fort Riley KS - Marshall AAF", "YSM - Fort Smith", "FSM - Fort Smith AR", "YXJ - Fort St. John", "VPS - Fort Walton Beach FL", "FWA - Fort Wayne IN", "FOU - Foula (Shetland)", "FRW - Francistown", "FRA - Frankfurt\/Main Frankfurt Airport (Rhein-Main-Flughafen)", "HHN - Frankfurt\/Hahn", "FKL - Franklin\/Oil City PA", "YFC - Fredericton", "FPO - Freeport - Grand Bahama International Airport", "FNA - Freetown - Freetown-Lungi International Airport", "FRJ - Frejus", "FAT - Fresno CA", "FDH - Friedrichshafen - Bodensee-Airport Friedrichshafen", "FUE - Fuerteventura", "FJR - Fujairah International Airport", "FUK - Fukuoka", "FKS - Fukushima-shi Fukushima Airport", "FNC - Funchal", "FUT - Futuna", "GBE - Gaborone - Sir Seretse Khama International Airport", "GWY - Galway", "YQX - Gander", "GOU - Garoua", "GZA - Gaza City - Gaza International Airport", "GZT - Gaziantep", "GDN - Gdansk", "GEX - Geelong", "GVA - Geneva - Geneva-Cointrin International Airport", "GOA - Genoa", "GRJ - George", "GEO - Georgetown - Cheddi Jagan International Airport", "GET - Geraldton", "GRO - Gerona", "GNE - Ghent (Gent)", "GIB - Gibraltar", "GIL - Gilgit", "YGX - Gillam", "GLT - Gladstone Airport", "GLA - Glasgow", "GOI - Goa", "GYN - Goiania", "OOL - Gold Coast", "GOO - Goondiwindi", "YYR - Goose Bay", "GOZ - Gorna", "GOT - Gothenburg (Goteborg) - Landvetter", "GOV - Gove (Nhulunbuy)", "GHB - Govenors Harbour", "GRX - Granada", "GBI - Grand Bahama", "GCM - Grand Cayman - Owen Roberts International", "GRZ - Graz", "GKL - Great Keppel Island", "PGV - Greenville NC", "GSP - Greenville\/Spartanburg SC", "GND - Grenada - Point Salines Airport also Maurice Bishop", "GNB - Grenoble", "GFF - Griffith", "GRQ - Groningen - Eelde", "GTE - Groote Eylandt - Alyangula", "GON - Groton\/New London CT", "GDL - Guadalajara", "GSI - Guadalcanal", "CAN - Guangzhou (Canton) - Baiyun International Airport Guangdong", "GRU - Guarulhos International - Sao Paulo", "GUA - Guatemala City - La Aurora International Airport", "GYE - Guayaquil - Simon Bolivar", "GCI - Guernsey", "GTI - Guettin", "GPT - Gulfport\/Biloxi MS", "KWL - Guilin - Liangjiang Guangxi", "ULU - Gulu", "GUC - Gunnison\/Crested Butte CO", "GAU - Guwahati", "GWD - Gwadar", "GWE - Gweru", "GYP - Gympie", "GAD - Gadsden AL", "GNV - Gainesville FL", "GCC - Gilette WY", "PIK - Glasgow Prestwick", "GGW - Glasgow MT", "GDV - Glendive MT", "GCN - Grand Canyon AZ", "GFK - Grand Forks ND", "GJT - Grand Junction CO", "GRR - Grand Rapids MI", "GPZ - Grand Rapids MN", "GTF - Great Falls MT", "GRB - Green Bay WI", "LWB - Greenbrier\/Lewisburg WV", "GSO - Greensboro\/Winston Salem NC", "GLH - Greenville MS", "HAC - Hachijo Jima", "GUM - Hagatna - Guam International Airport", "HFA - Haifa", "HKD - Hakodate", "YHZ - Halifax International", "YUX - Hall Beach", "HAM - Hamburg - Fuhlsbuettel", "HLT - Hamilton", "YHM - Hamilton", "HLZ - Hamilton", "HTI - Hamilton Island", "HFT - Hammerfest", "HAJ - Hannover", "HAN - Hanoi - Noibai", "HRE - Harare", "HDY - Hatyai (Hat Yai)", "HAU - Haugesund", "HAV - Havana - Jose Marti International", "HIS - Hayman Island", "JHE - Helsingborg", "HEL - Helsinki - Vantaa", "HER - Heraklion", "HMO - Hermosillo - Gen. Pesqueira Garcia", "HVB - Hervey Bay", "HNK - Hinchinbrook Island", "HIJ - Hiroshima International", "SGN - Ho Chi Minh City (Saigon) - Tan Son Nhat International", "HBA - Hobart", "HOQ - Hof", "HOG - Holguin", "HMH - Home Hill", "HOM - Homer AK", "HKG - Hong Kong - International Airport (HKIA)", "ZJK - Hong Kong - Chek Lap Kok", "HIR - Honiara Henderson International", "HNL - Honolulu HI - Honolulu International Airport", "HNH - Hoonah AK", "HOR - Horta", "HOU - Houston TX Hobby", "IAH - Houston TX - George Bush Intercontinental Airport", "HUH - Huahine", "HUX - Huatulco", "HUI - Hue - Phu Bai", "HUY - Humberside", "HTS - Huntington WV", "HSV - Huntsville AL", "HRG - Hurghada International", "HON - Huron SD", "HWN - Hwange National Park", "HYA - Hyannis MA", "HYG - Hydaburg AK", "HYD - Hyderabad - Rajiv Gandhi Int. Airport", "HDD - Hyderabad", "HNS - Haines AK", "CMX - Hancock MI", "HGH - Hangchow (Hangzhou)Zhejiang", "HRB - Harbin (Haerbin)Heilongjiang", "HRL - Harlington\/South Padre Island TX", "YHR - Harrington Harbour PQ", "HAR - Harrisburg PA - Harrisburg Skyport", "MDT - Harrisburg PA - Harrisburg International", "BDL - Hartford CT\/Springfield MA", "HVR - Havre MT", "HLN - Helena MT", "HIB - Hibbing MN", "HKY - Hickory NC", "ITO - Hilo HI", "HHH - Hilton Head Island SC", "IBZ - Ibiza", "ILP - Ile des Pins", "IOU - Ile Ouen", "IGH - Ingham", "IFL - Innisfail", "INN - Innsbruck - Kranebitten", "YEV - Inuvik", "IVC - Invercargill", "INV - Inverness", "YFB - Iqaluit (Frobisher Bay)", "IQT - Iquitos", "IKT - Irkutsk", "LSG - Ishigaki", "ISB - Islamabad - International Airport", "ILY - Islay", "IOM - Isle of Man", "IST - Istanbul - Ataturk", "SAW - Istanbul - Sabiha Gokcen", "IVL - Ivalo", "ZIH - Ixtapa\/Zihuatenejo", "IZM - Izmir", "ADB - Izmir - Adnan Menderes", "IDA - Idaho Falls ID", "IGR - Iguazu Cataratas", "ILI - Iliamna AK", "IPL - Imperial CA", "IND - Indianapolis IN International", "INL - International Falls MN", "IYK - Inykern CA", "ITH - Ithaca\/Cortland NY", "JXN - Jackson MI - Reynolds Municipal", "MJQ - Jackson MN", "JAN - Jackson MS - Jackson Internationall", "HKS - Jackson MS - Hawkins Field", "MKL - Jackson TN - Mckellar", "JAC - Jackson Hole WY", "LRF - Jacksonville AR Little Rock AFB", "NZC - Jacksonville FL - Cecil Field NAS", "NIP - Jacksonville FL Jacksonville NAS", "JAX - Jacksonville FL - International", "CRG - Jacksonville FL - Craig Municipal", "IJX - Jacksonville IL - Municipal Airport", "OAJ - Jacksonville NC", "JKV - Jacksonville TX", "JAK - Jacmel", "JAG - Jacobabad", "JCM - Jacobina", "JAQ - Jacquinot Bay", "JAF - Jaffna - Kankesanturai", "JGB - Jagdalpur", "JAI - Jaipur - Sanganeer", "JSA - Jaisalmer", "HLP - Jakarta - Halim Perdana Kusuma", "JKT - Jakarta - Metropolitan Area", "CGK - Jakarta - Soekarno-Hatta International", "JAA - Jalalabad", "JLR - Jabalpur Airport", "JAL - Jalapa", "JLS - Jales", "UIT - Jaluit Island", "JMB - Jamba", "DJB - Jambi - Sultan Taha Syarifudn", "JAM - Jambol", "JMS - Jamestown ND", "JHW - Jamestown NY", "IXJ - Jammu - Satwari", "JGA - Jamnagar - Govardhanpur", "IXW - Jamshedpur - Sonari", "JKR - Janakpur", "JAD - Jandakot", "JVL - Janesville WI - Rock County", "JNA - Januaria", "JQE - Jaque", "JTI - Jatai", "JAU - Jauja", "DJJ - Jayapura - Sentani", "JED - Jeddah - King Abdulaziz International", "JEF - Jefferson City MO - Jefferson Memorial", "JEE - Jeremie - Jeremie Airport", "XRY - Jerez de la Frontera\/Cadiz - La Parra", "JER - Jersey", "JRS - Jerusalem - Atarot Airport (closed)", "JSR - Jessore - Jessore Airport", "PYB - Jeypore - Jeypore Airport", "KNC - JiAn Jiangxi", "JMU - Jiamusi - Jiamusi Airport", "GJL - Jijel", "JIJ - Jijiga", "JIL - Jilin", "JIM - Jimma", "TNA - JinanShandong", "JDZ - Jingdezhen", "JHG - Jinghong - Gasa Airport", "JNG - Jining", "JIN - Jinja", "JJN - Jinjiang", "BCO - Jinka - Baco\/Jinka Airport", "JNZ - Jinzhou - Jinzhou Airport", "JIP - Jipijapa", "JIR - Jiri", "JIU - Jiujiang", "CHW - Jiuquan", "JIW - Jiwani", "JCB - Joacaba", "JPA - Joao Pessoa - Castro Pinto Airport", "JDH - Jodhpur", "JKG - Jonkoping (Jonkoping) - Axamo Airport", "JOE - Joensuu", "JNB - Johannesburg - OR Tambo International Airport", "BGM - Johnson City NY - Binghamton\/Endicott\/Johnson Airport", "JON - Johnston Island", "JST - Johnstown PA", "JHB - Johor Bahru - Sultan Ismail International", "JOI - Joinville - Cubatao Airport", "JOL - Jolo", "JMO - Jomsom", "JBR - Jonesboro AR Jonesboro Airport", "JLN - Joplin MO", "JRH - Jorhat - Rowriah Airport", "JOS - Jos", "JSM - Jose De San Martin", "AJF - Jouf", "JJI - Juanjui", "JUB - Juba", "JUI - Juist (island)", "JDF - Juiz De Fora - Francisco De Assis Airport", "JUJ - Jujuy - El Cadillal Airport", "JCK - Julia Creek", "JUL - Juliaca", "JUM - Jumla", "JUN - Jundah", "JNU - Juneau AK - Juneau International Airport", "JNI - Junin", "JUT - Juticalpa", "JWA - Jwaneng", "JYV - Jyvaskyla (Jyvaskyla)", "KBL - Kabul - Khwaja Rawash Airport", "KOJ - Kagoshima", "KCM - Kahramanmaras \/ Maras", "KAJ - Kajaani", "KLX - Kalamata", "KGI - Kalgoorlie", "KLR - Kalmar", "KAN - Kano", "QJU - Kanpur", "KHH - Kaohsiung International", "KHI - Karachi - Jinnah International Airport", "FKB - Karlsruhe-Baden - Soellingen", "KSD - Karlstad", "AOK - Karpathos", "KTA - Karratha", "KYS - Kars", "KRB - Karumba", "KRP - Karup", "KSL - Kassala", "KTR - Katherine", "KTM - Kathmandu - Tribhuvan International Airport", "MPA - Katima Mulilo\/Mpacha", "KHJ - Kauhajoki", "KVA - Kavalla", "ASR - Kayseri", "KZN - Kazan (Ka San)", "KMP - Keetmanshoop", "KEM - Kemi\/Tornio", "ZNS - Kempten", "MSE - Kent (Manston) Kent International", "KIR - Kerry County", "AHB - Khamis Mushayat", "UVL - Kharga - New Valley", "HRK - Kharkov", "KRT - Khartoum - Khartoum International Airport", "KDD - Khuzdar", "KEL - Kiel - Holtenau", "KBP - Kiev - Borispol", "IEV - Kiev - Zhulhany", "KGL - Kigali - Gregoire Kayibanda", "JRO - Kilimadjaro", "KIM - Kimberley", "KNS - King Island", "KGC - Kingscote", "KIN - Kingston - Norman Manley", "SVD - Kingstown - E. T. (St. Vincent) Joshua Airport", "FIH - Kinshasa - NDjili", "KKN - Kirkenes", "KIK - Kirkuk", "KOI - Kirkwall (Orkney)", "KRN - Kiruna", "FKI - Kisangani", "KTT - Kittila", "KIW - Kitwe", "KLU - Klagenfurt", "KLZ - Kleinsee", "NOC - Knock", "UKB - Kobe", "KCZ - Kochi", "OHT - Kohat", "KOK - Kokkola\/Pietarsaari", "CCU - Kolkata (Calcutta) - Netaji Subhas Chandra", "KMQ - Komatsu", "KYA - Konya", "HGO - Korhogo", "KGS - Kos", "BKI - Kota Kinabalu", "KWM - Kowanyama", "KRK - Krakau", "KRS - Kristiansand", "KID - Kristianstad", "KSU - Kristiansund", "KUB - Kuala Belait", "KUL - Kuala Lumpur - International Airport", "SZB - Kuala Lumpur - Sultan Abdul Aziz Shah", "KUA - Kuantan", "KCH - Kuching", "KMJ - Kumamoto", "KNX - Kununurra", "KUO - Kuopio", "KUH - Kushiro", "YVP - Kuujjuaq (FortChimo)", "YGW - Kuujjuarapik", "KAO - Kuusamo", "KWI - Kuwait - Kuwait International", "UKY - Kyoto", "OGG - Kahului HI", "AZO - Kalamazoo\/Battle Creek MI", "FCA - Kalispell MT", "YKA - Kamloops BC", "MUE - Kamuela HI", "MCI - Kansas City MO - Kansas City International Airport", "JHM - Kapalua West HI", "ZKE - Kaschechawan PQ", "MKK - Kaunakakai HI", "YLW - Kelowna BC", "ENA - Kenai AK", "KTN - Ketchikan AK", "EYW - Key West FL", "ILE - Killeem TX", "AKN - King Salomon AK", "ISO - Kingston NC", "LMT - Klamath Fall OR", "TYS - Knoxville TN", "ADQ - Kodiak AK", "KOA - Kona HI", "OTZ - Kotzbue AK", "LEK - Labe", "LBU - Labuan", "LCG - La Coruna", "LAE - Lae", "LRH - La Rochelle", "LOS - Lagos - Murtala Muhammed", "YGL - La Grande", "LHE - Lahore", "LKL - Lakselv", "LBQ - Lambarene", "SUF - Lamezia Terme", "LMP - Lampedusa", "LQE - Lands End", "LGK - Langkawi", "LAI - Lannion", "HLA - Lanseria", "LPB - La Paz - El Alto", "LAP - La Paz - Leon", "LPP - Lappeenranta", "LCA - Larnaca", "LPA - Las Palmas", "LST - Launceston", "LVO - Laverton", "LZC - Lazaro Cardenas", "YLR - Leaf Rapids", "LEA - Learmouth (Exmouth)", "LBA - Leeds\/Bradford", "LER - Leinster", "LEJ - Leipzig", "LEY - Lelystad", "BJX - Leon", "LNO - Leonora", "LWK - Lerwick\/Tingwall (Shetland Islands)", "LBV - Libreville", "LDK - Lidkoeping", "LGG - Liege", "LIL - Lille", "LLW - Lilongwe - Lilongwe International", "LIM - Lima - J Chavez International", "QLI - Limassol", "LIG - Limoges", "LDC - Lindeman Island", "LNZ - Linz - Hoersching", "LIQ - Lisala", "LIS - Lisbon - Lisboa", "LSY - Lismore", "LPL - Liverpool", "LZR - Lizard Island", "LJU - Ljubljana - Brnik", "IRG - Lockhart River", "LFW - Lome", "YXU - London", "LON - London Metropolitan Area", "LCY - London - City Airport", "LGW - London - Gatwick", "LHR - London - Heathrow", "LTN - London - Luton", "STN - London - Stansted", "LRE - Longreach", "LYR - Longyearbyen - Svalbard", "LTO - Loreto", "LRT - Lorient", "LMM - Los Mochis", "LSZ - Losinj - Losinj Arpt", "LDE - Lourdes\/Tarbes", "LAD - Luanda - 4 de Fevereiro", "LKO - Lucknow", "LUD - Luederitz", "MLA - Luga", "LUG - Lugano", "LLA - Lulea", "FBM - Lumbumbashi", "LUN - Lusaka", "LUJ - Lusisiki", "LUX - Luxembourg", "LXR - Luxor", "LYX - Lydd - Lydd International Airport", "LYN - Lyon - Bron", "LYS - Lyon - Satolas", "WLB - Labouchere Bay AK", "XLB - Lac Brochet MB", "LSE - La Crosse WI", "LAF - Lafayette IN", "LFT - Lafayette La", "LCH - Lake Charles La", "HII - Lake Havasu City AZ", "TVL - Lake Tahoe CA", "LNY - Lanai City HI", "LNS - Lancaster PA", "LAN - Lansing MI", "LAR - Laramie WY", "LRD - Laredo TX", "LAS - Las Vegas NV", "LBE - Latrobe PA", "LAW - Lawton OK", "LEB - Lebanon NH", "LWS - Lewiston ID", "LWT - Lewistown MT", "LEX - Lexington KY", "LIF - LifouLoyaute", "LIH - Lihue HI", "LNK - Lincoln NE", "LIT - Little Rock AR", "LGB - Long Beach CA", "ISP - Long Island Islip NY - Mac Arthur", "GGG - Longview\/Kilgore TX", "LAX - Los Angeles CA - International", "SDF - Louisville KY", "LBB - Lubbock TX", "LUM - Luxi - Mangshi Yunnan", "LWO - Lvov (Lwow Lemberg)", "LYH - Lynchburg VA", "LYO - Lyons KS - Rice County Municipal", "MST - Maastricht\/Aachen", "MCP - Macapa", "MFM - Macau Macau", "MCZ - Maceio", "MKY - Mackay", "MCN - Macon GA", "NOP - Mactan Island - Nab", "MED - Madinah Mohammad Bin Abdulaziz", "MSN - Madison WI", "MAA - Madras (Chennai)", "MAD - Madrid - Barajas", "SEZ - Mahe - Seychelles International", "MAH - Mahon", "MTL - Maitland", "MJN - Majunga", "MZG - Makung", "SSG - Malabo", "AGP - Malaga", "MLX - Malatya", "MLE - Male - International", "MYD - Malindi", "MMA - Malmo (Malmoe)", "MMX - Malmo (Malmo) - Sturup", "MJC - Man", "MGA - Managua - Augusto C Sandino", "MAO - Manaus", "MAN - Manchester", "MHT - Manchester NH", "MDL - Mandalay - Annisaton", "MFO - Manguna", "XMH - Manihi", "MNL - Manila - Ninoy Aquino International", "ZLO - Manzanillo", "MTS - Manzini - Matsapha International", "MPM - Maputo - Maputo International", "MDQ - Mar del Plata", "MAR - Maracaibo - La Chinita", "MFQ - Maradi", "MTH - Marathon FL", "MQM - Mardin", "MEE - Mare", "MGH - Margate", "PMV - Margerita", "MBX - Maribor", "MHQ - Mariehamn (Maarianhamina)", "MVR - Maroua", "MQT - Marquette MI", "RAK - Marrakech - Menara", "RMF - Marsa Alam", "MUH - Marsa Matrah (Marsa Matruh)", "MRS - Marseille", "MHH - Marsh Harbour", "MVY - Martha s Vineyard MA", "MRB - Martinsburg WV", "MBH - Maryborough", "MSU - Maseru - Moshoeshoe International", "MCW - Mason City IA", "MVZ - Masvingo", "MMJ - Matsumoto Nagano", "MYJ - Matsuyama", "MTO - Mattoon IL", "MUB - Maun", "MAU - Maupiti", "MRU - Mauritius - S.Seewoosagur Ram International", "MAZ - Mayaguez", "MZT - Mazatlan", "MFE - McAllen TX", "MES - Medan", "MDE - Medellin", "MFR - Medford OR", "MKR - Meekatharra", "MEL - Melbourne - Tullamarine", "MLB - Melbourne FL", "DOM - Melville Hall", "MEM - Memphis TN", "MDZ - Mendoza", "MDC - Manado", "MCE - Merced CA", "MID - Merida", "MEI - Meridian MS", "MIM - Merimbula", "MEZ - Messina", "MTM - Metlakatla AK", "MZM - Metz - Frescaty", "ETZ - Metz\/Nancy Metz-Nancy-Lorraine", "MXL - Mexicali", "AZP - Mexico City - Atizapan", "MEX - Mexico City - Juarez International", "NLU - Mexico City - Santa Lucia", "MFU - Mfuwe", "MIA - Miami FL", "MWD - Mianwali", "MMM - Middlemount", "MAF - Midland\/Odessa TX", "MDY - Midway Island - Sand Island Field", "MIK - Mikkeli", "AOI - Ancona", "LIN - Milan - Linate", "MXP - Milan - Malpensa", "MQL - Mildura", "MLS - Miles City MT", "MFN - Milford Sound", "MKE - Milwaukee WI", "MTT - Minatitlan", "MRV - Mineralnye Vody", "MSP - Minneapolis - St. Paul International Airport MN", "MOT - Minot ND", "MSQ - Minsk International", "MYY - Miri", "QML - Mirpur", "MSO - Missula MT", "MHE - Mitchell SD", "MMY - Miyako Jima (Ryuku Islands) - Hirara", "KMI - Miyazaki", "MBM - Mkambati", "MFF - Moanda", "MOB - Mobile AL - Pascagoula MS", "MOD - Modesto CA", "MJD - Moenjodaro", "MGQ - Mogadishu", "OKU - Mokuti", "MLI - Moline\/Quad Cities IL", "MBA - Mombasa - Moi International", "MIR - Monastir", "YQM - Moncton", "MLU - Monroe La", "MLW - Monrovia", "ROB - Monrovia - Roberts International", "MBJ - Montego Bay - Sangster International", "QGF - Montenegro", "MRY - Monterey CA", "MTY - Monterrey - Gen. Mariano Escobedo", "NTR - Monterrey - Aeropuerto Del Norte", "MVD - Montevideo - Carrasco", "MGM - Montgomery AL", "MPL - Montpellier - Frejorgues", "YMQ - Montreal", "YUL - Montreal - Dorval (Montreal-Trudeau)", "YMX - Montreal - Mirabel", "MTJ - Montrose\/Tellruide CO", "MOZ - Moorea", "MOV - Moranbah", "MRZ - Moree", "MLM - Morelia", "MGW - Morgantown WV", "HNA - Morioka Hanamaki", "HAH - Moroni - Prince Said Ibrahim", "YVA - Moroni - Iconi", "MYA - Moruya", "MOW - Moscow - Metropolitan Area", "DME - Moscow - Domodedovo", "SVO - Moscow - Sheremetyevo", "VKO - Moscow - Vnukovo", "MWH - Moses Lake WA", "MZY - Mossel Bay", "OMO - Mostar", "OSM - Mosul", "MJL - Mouila", "MQQ - Moundou", "GTN - Mount Cook", "MGB - Mount Gambier", "MMG - Mount Magnet", "ISA - Mt. Isa", "MCL - Mt. McKinley AK", "MUC - Muenchen (Munich) - Franz Josef Strauss", "FMO - Muenster\/Osnabrueck", "MLH - Mulhouse", "MUX - Multan", "MJV - Murcia", "MMK - Murmansk", "MSR - Mus", "MCT - Muscat - Seeb", "MSL - Muscle Shoals AL", "MKG - Muskegon MI", "MFG - Muzaffarabad", "MVB - Mvengue", "JMK - Mykonos", "MYR - Myrtle Beach SC - Myrtle Beach AFB", "CRE - Myrtle Beach SC - Grand Strand Airport", "MYQ - Mysore", "MJT - Mytilene (Lesbos)", "MZF - Mzamba", "NAN - Nadi", "NGS - Nagasaki", "NGO - Nagoya - Komaki AFB", "NAG - Nagpur", "NBO - Nairobi", "NAJ - Nakhichevan", "NST - Nakhon Si Thammarat", "ENC - Nancy", "YSR - Nanisivik", "NTE - Nantes", "NAP - Naples", "NAA - Narrabri", "NRA - Narrandera", "UAK - Narsarsuaq", "NAT - Natal", "WNS - Nawab Shah", "JNX - Naxos - Naxos Airport", "NDJ - N Djamena", "NLA - N Dola", "NSN - Nelson", "NLP - Nelspruit", "MQP - Nelspruit - Kruger Mpumalanga International Airport", "NEV - Nevis", "NQY - Newquay", "BEO - Newcastle - Belmont", "NTL - Newcastle - Williamtown", "NCL - Newcastle", "NCS - Newcastle", "ZNE - Newman", "NGE - N Gaoundere", "IAG - Niagara Falls International", "NIM - Niamey", "NCE - Nice - Cote D Azur", "NIC - Nicosia", "NLV - Nikolaev", "KIJ - Niigata", "FNI - Nimes", "INI - Nis", "NSA - Noosa", "YVQ - Norman Wells", "NRK - Norrkoeping", "ELH - North Eleuthera", "NWI - Norwich", "EMA - Nottingham - East Midlands", "NDB - Nouadhibou", "NKC - Nouakchott", "NOU - Noumea", "QND - Novi Sad", "OVB - Novosibirsk - Tolmachevo", "NUE - Nurnberg (Nuremberg)", "NLD - Nuevo Laredo", "TBU - Nuku alofa - Fua Amotu International", "NNG - Nanning Guangxi", "ACK - Nantucket MA", "APF - Naples FL", "BNA - Nashville TN", "EWN - New Bern NC", "HVN - New Haven CT", "MSY - New Orleans La", "JFK - New York - John F. Kennedy NY", "LGA - New York - LaGuardia NY", "EWR - New York - Newark NJ", "NYC - New York NY", "SWF - Newburgh NY", "PHF - Newport News\/Williamsburg VA", "OME - Nome AK", "NLK - Norfolk Island", "OTH - North Bend OR", "OAX - Oaxaca - Xoxocotlan", "ODE - Odense", "ODS - Odessa", "ORB - Oerebro", "OHD - Ohrid", "OIT - Oita", "OKJ - Okayama", "OLB - Olbia", "OLP - Olympic Dam", "OND - Ondangwa", "ORN - Oran (Ouahran)", "OAG - Orange", "OMD - Oranjemund", "ORS - Orpheus Island", "ITM - Osaka - Itami", "KIX - Osaka - Kansai International Airport", "OSI - Osijek", "OSL - Oslo", "FBU - Oslo - Fornebu", "TRF - Oslo - Sandefjord", "YOW - Ottawa - Hull", "ODA - Ouadda", "OZZ - Ouarzazate", "OUH - Oudtshoorn", "OUA - Ouagadougou", "OUD - Oujda", "OUL - Oulu", "OUK - Out Skerries (Shetland)", "OVD - Oviedo", "UVE - Oyem", "OKA - Okinawa Ryukyo Island - Naha", "OKC - Oklahoma City OK - Will Rogers World", "OMA - Omaha NE", "ONT - Ontario CA", "ORL - Orlando Metropolitan Area FL", "OSA - Osaka Metropolitan Area", "OSH - Oshkosh WI", "OWB - Owensboro KY", "OXR - Oxnard CA", "PAD - Paderborn\/Lippstadt", "PPG - Pago Pago", "PMO - Palermo - Punta Raisi", "PMI - Palma de Mallorca", "PMR - Palmerston North", "PTY - Panama City - Tocumen International", "PJG - Panjgur", "PNL - Pantelleria", "PPT - Papeete - Faaa", "PFO - Paphos", "PBO - Paraburdoo", "PBM - Paramaribo - Zanderij International", "PAR - Paris", "CDG - Paris - Charles de Gaulle", "LBG - Paris - Le Bourget", "ORY - Paris - Orly", "PBH - Paro", "PSI - Pasni", "PAT - Patna", "PYX - Pattaya", "PUF - Pau", "PEN - Penang International", "PEI - Pereira", "PGF - Perpignan", "PER - Perth International", "PEG - Perugia", "PSR - Pescara", "PEW - Peshawar", "PHW - Phalaborwa", "PNH - Phnom Penh - Pochentong", "HKT - Phuket", "PZB - Pietermaritzburg", "PTG - Pietersburg", "NTY - Pilanesberg\/Sun City", "PSA - Pisa - Galileo Galilei", "PBZ - Plettenberg Bay", "TGD - Podgorica", "PNI - Pohnpei", "PNR - Pointe Noire", "PIS - Poitiers - Biard", "PSE - Ponce", "PDL - Ponta Delgada", "POR - Pori", "PAP - Port au Prince", "PUG - Port Augusta", "PLZ - Port Elizabeth", "POG - Port Gentil", "PHC - Port Harcourt", "PHE - Port Hedland", "PTJ - Portland", "PLO - Port Lincoln", "PQQ - Port Macquarie", "POM - Port Moresby - Jackson Field", "OPO - Porto", "POA - Porto Alegre", "POS - Port of Spain - Piarco International", "PSD - Port Said", "PXO - Porto Santo", "PVH - Porto Velho", "VLI - Port Vila", "PRG - Prague - Ruzyne", "RAI - Praia", "PRY - Pretoria - Wonderboom Apt.", "PVK - Preveza\/Lefkas", "YXS - Prince George", "YPR - Prince Rupert\/Digby Island", "PRN - Pristina", "PPP - Prosperpine", "PBC - Puebla", "PXM - Puerto Escondido", "PZO - Puerto Ordaz", "POP - Puerto Plata", "PVR - Puerto Vallarta", "XPK - Pukatawagan", "PUY - Pula", "PNQ - Pune", "PUQ - Punta Arenas", "PUJ - Punta Cana", "PUS - Pu San (Pusan) - Kimhae", "PAH - Paducah KY", "PGA - Page\/Lake Powell AZ", "PKB - Pakersburg WV\/Marietta OH", "PSP - Palm Springs CA", "PMD - Palmdale\/Lancaster CA", "PFN - Panama City FL", "PSC - Pasco WA", "PLN - Pellston MI", "PDT - Pendelton OR", "PNS - Pensacola FL", "PIA - Peoria\/Bloomington IL", "PSG - Petersburg AK", "PHL - Philadelphia PA - International", "PHX - Phoenix AZ - Sky Harbor International", "PIR - Pierre SD", "PIT - Pittsburgh International Airport PA", "PLB - Plattsburgh NY", "PIH - Pocatello ID", "CLM - Port Angeles WA", "PWM - Portland ME", "PDX - Portland International OR", "YPN - Port Menier PQ", "POU - Poughkeepsie NY", "POZ - Poznan Lawica", "PQI - Presque Island ME", "PVD - Providence RI", "FNJ - Pyongyang - Sunan", "PUB - Pueblo CO", "PUW - Pullman WA", "YQB - Quebec - Quebec International", "UEE - Queenstown", "ZQN - Queenstown", "UET - Quetta", "TAO - Qingdao Shandong", "UIP - Quimper", "UIN - Quincy IL", "UIO - Quito - Mariscal Sucr", "RBA - Rabat - Sale", "RYK - Rahim Yar Khan", "RFP - Raiatea", "YOP - Rainbow Lake AB", "RAJ - Rajkot", "RDU - Raleigh\/Durham NC", "IXR - Ranchi", "RGI - Rangiroa", "RAP - Rapid City SD", "RAR - Rarotonga", "RKT - Ras al Khaymah (Ras al Khaimah)", "RAZ - Rawala Kot", "RWP - Rawalpindi", "RDG - Reading PA", "REC - Recife", "RDD - Redding CA", "REG - Reggio Calabria", "YQR - Regina", "TFS - Reina Sofia \/ Tenerife - Sur Reina Sofia", "RNS - Rennes", "YRB - Resolute Bay", "REU - Reus", "REK - Reykjavik - Metropolitan Area", "KEF - Reykjavik - Keflavik International", "RHO - Rhodos", "RCB - Richards Bay", "RIX - Riga", "RJK - Rijeka", "RMI - Rimini", "RBR - Rio Branco", "GIG - Rio de Janeiro - Galeao", "SDU - Rio de Janeiro - Santos Dumont", "RIO - Rio de Janeiro", "RUH - Riyadh - King Khaled International", "RNE - Roanne", "RTB - Roatan", "RSD - Rock Sound", "ROK - Rockhampton", "RDZ - Rodez", "RRG - Rodrigues Island", "RNN - Roenne", "CIA - Rome - Ciampino", "FCO - Rome - Fuimicino", "RNB - Ronneby", "ROS - Rosario", "ROT - Rotorua", "RTM - Rotterdam", "RVN - Rovaniemi", "NDU - Rundu", "ROU - Ruse", "RDM - Redmond OR", "RNO - Reno NV", "RHI - Rhinelander WI", "RIC - Richmond VA", "ROA - Roanoke VA", "RST - Rochester MN", "ROC - Rochester NY", "RKS - Rock Springs WY", "RFD - Rockford IL", "RKD - Rockland ME", "RWI - Rocky Mount - Wilson NC", "SCN - Saarbruecken", "SDS - Sado Shima", "SDT - Saidu Sharif", "SBK - Saint Brieuc", "RUN - Saint Denis de la Reunion", "YSJ - Saint John", "SPN - Saipan", "SID - Sal", "SLL - Salalah", "SNC - Salinas", "SAY - Salisbury", "SSA - Salvador", "SZG - Salzburg - W.A. Mozart", "SKD - Samarkand", "SMI - Samos", "SZF - Samsun", "ADZ - San Andres", "BRC - San Carlos de Bariloche", "SJD - San Jose Cabo \/ Los Cabos", "SJO - San Jose", "SJU - San Juan", "SLP - San Luis Potosi", "SPY - San Pedro", "SAP - San Pedro Sula", "ZSA - San Salvador", "SAL - San Salvador", "EAS - San Sebastian", "SAH - Sanaa (Sana a Sana a International", "YZP - Sandspit", "SPC - Santa Cruz de la Palma", "SRZ - Santa Cruz de la Sierra", "SKV - Santa Katarina - Mount Sinai", "SMA - Santa Maria", "SDR - Santander", "SRB - Santa Rosa", "SRA - Santa Rosa", "RSA - Santa Rosa", "SSL - Santa Rosalia", "SRL - Santa Rosalia", "SCU - Santiago - Antonio Maceo Airport", "SCL - Santiago de Chile - Arturo Merino Benitez", "SCQ - Santiago de Compostela", "SON - Singapore - Changi", "SDQ - Santo Domingo", "SLZ - Sao Luis", "SAO - Sao Paulo", "CGH - Sao Paulo - Congonhas", "VCP - Sao Paulo - Viracopos", "TMS - Sao Tome", "CTS - Sapporo - Shin-Chitose Airport", "SJJ - Sarajevo", "YXE - Saskatoon", "ZSS - Sassandra", "SVL - Savonlinna", "TAB - Tobago \/ Scarborough - Crown Point International", "NSO - Scone", "SEB - Sehba", "SJY - Seinaejoki", "PKW - Selibi Phikwe", "SDJ - Sendai", "ICN - Seoul - Incheon International Airport", "SEL - Seoul - Kimpo", "SVQ - Sevilla", "SFA - Sfax", "SHA - Shanghai - Hongqiao", "PVG - Shanghai - Pu Dong", "SNN - Shannon (Limerick)", "SHJ - Sharjah", "SSH - Sharm El Sheikh", "JHQ - Shute Harbour", "SBW - Sibu", "SLS - Silistra", "SIP - Simferopol", "MPD - Sindhri", "SIN - Singapore - Changi", "QPG - Singapore - Paya Lebar", "XSP - Singapore - Seletar", "SIX - Singleton", "SIS - Sishen", "VAS - Sivas", "SEW - Siwa", "KDU - Skardu", "JSI - Skiathos", "SKP - Skopje", "SKS - Skrydstrup", "SZK - Skukuza", "SXL - Sligo", "YYD - Smithers", "SOT - Sodankylae", "SGD - Soenderborg", "SFJ - Soendre Stroemfjord", "SOF - Sofia - Vrazhdebna", "SOG - Sogndal", "SOU - Southampton - Eastleigh", "SOI - South Molle Island", "SEN - Southend (London)", "SPU - Split", "SBU - Springbok", "SXR - Srinagar", "STX - St. Croix", "EBU - St. Etienne", "YYT - St. John s", "UVF - St. Lucia Hewanorra", "SXM - St. Marteen", "SFG - St. Martin", "LED - St. Petersburg (Leningrad) - Pulkovo", "STT - St. Thomas", "SVG - Stavanger", "SZZ - Stettin", "STO - Stockholm Metropolitan Area", "ARN - Stockholm - Arlanda", "BMA - Stockholm - Bromma", "SYY - Stornway", "SXB - Strassburg", "KBY - Streaky Bay", "STR - Stuttgart - Echterdingen", "SUL - Sui", "SKZ - Sukkur", "LSI - Sumburgh (Shetland)", "SDL - Sundsvall", "MCY - Sunshine Coast", "SUB - Surabaya - Juanda", "STV - Surat", "SUV - Suva\/Nausori", "SWP - Swakopmund", "SYD - Sydney", "ZYL - Sylhet", "SMF - Sacramento CA", "MBS - Saginaw\/Bay City\/Midland MI", "SLE - Salem OR", "SNS - Salinas CA", "SBY - Salisbury MD", "SLA - Salta Gen Belgrano", "SLC - Salt Lake City UT", "SJT - San Angelo TX", "SAT - San Antonio TX", "SAN - San Diego - Lindberg Field International CA", "SFO - San Francisco - International Airport SA", "SJC - San Jose CA", "SBP - San Luis Obisco CA", "SNA - Santa Ana - John Wayne Airport CA", "SBA - Santa Barbara CA", "SMX - Santa Maria CA", "STS - Santa Rosa CA", "SDH - Santa Rosa Copan", "SPK - Sapporo Hokkaido", "OKD - Sapporo - Okadama Hokkaido", "SRQ - Sarasota\/Bradenton FL", "SAV - Savannah GA", "SCF - Scottsdale AZ", "SEA - Seattle\/Tacoma WA", "ZTM - Shamattawa MB", "SZD - Sheffield City Airport", "DCS - Sheffield Doncaster Robin Hood International Airport", "SHD - Shenandoah Valley\/Stauton VA", "SHE - Shenyang Liaoning", "SZX - Shenzhen - Baoan Guangdong", "SHR - Sheridan WY", "SHV - Shreveport La", "SDY - Sidney MT", "SUX - Sioux City IA", "FSD - Sioux Falls SD", "SIT - Sitka AK", "SGY - Skagway AK", "SBN - South Bend IN", "XSI - South Indian Lake MB", "GEG - Spokane WA", "SPI - Springfield IL", "SGF - Springfield MO", "YIF - St. Augustin PQ", "SGU - St. George UT", "STL - St. Louis - Lambert MO", "FSP - St. Pierre NF", "SCE - State College\/Belefonte PA", "HDN - Steamboat Springs CO", "SCK - Stockton CA", "SUN - Sun Valley ID", "SYR - Syracuse NY", "TUU - Tabuk", "TIF - Taif", "TPE - Taipei - Chiang Kai Shek", "TAY - Taipei - Sung Shan", "TYN - Taiyuan Shanxi", "TAK - Takamatsu", "TKA - Talkeetna AK", "TLH - Tallahassee FL", "QUF - Tallinn - Pirita Harbour", "TLL - Tallinn - Ulemiste", "TPA - Tampa - International FL", "TMP - Tampere", "TAM - Tampico - Gen. F. Javier Mina", "TMW - Tamworth", "TNG - Tangier - Boukhalef", "TRO - Taree", "TGV - Targovishte", "TAS - Tashkent - Vostochny", "TWU - Tawau", "TBS - Tbilisi - Novo Alexeyevka", "TEU - Te Anau", "MME - Teesside Durham Tees Valley", "TGU - Tegucigalpa", "THR - Tehran (Teheran) - Mehrabad", "TEQ - Tekirdag - Corlu", "TLV - Tel Aviv - Ben Gurion International", "TEX - Telluride CO", "TEM - Temora", "TCI - Tenerife", "TFN - Tenerife - Norte Los Rodeos", "TCA - Tennant Creek", "TER - Terceira", "THE - Teresina", "TMZ - Termez (Termes)", "YXT - Terrace", "HUF - Terre Haute IN", "TXK - Texarkana AR", "TCU - Thaba Nchu", "YQD - The Pas", "SKG - Thessaloniki - Makedonia Apt.\/Saloniki", "TVF - Thief River Falls MN", "JTR - Thira", "TRV - Thiruvananthapuram", "TED - Thisted", "YTH - Thompson", "KTB - Thorne Bay AK", "YQT - Thunder Bay", "TIS - Thursday Island", "TSN - Tianjin", "TIJ - Tijuana - Rodriguez", "TOD - Tioman", "TIA - Tirana - Rinas", "TRZ - Tiruchirapally", "TIV - Tivat", "TKS - Tokushima", "TYO - Tokyo", "HND - Tokyo - Haneda", "NRT - Tokyo - Narita", "TOL - Toledo OH", "TPR - Tom Price", "TWB - Toowoomba", "YTZ - Toronto Island", "YYZ - Toronto - Lester B. Pearson", "YTO - Toronto", "TOV - Tortola", "TOU - Touho", "TLS - Toulouse - Blagnac", "TSV - Townsville", "TOY - Toyama", "TZX - Trabzon", "TPS - Trapani", "TVC - Traverse City MI", "TCB - Treasure Cay", "TTN - Trenton\/Princeton NJ", "TSF - Treviso", "TRI - Tri-Cities Regional TN\/VA", "TRS - Trieste", "TIP - Tripoli - Tripoli International", "TOS - Tromsoe", "TRD - Trondheim", "TSB - Tsumeb", "TUS - Tucson AZ", "TUP - Tulepo MS", "TUL - Tulsa OK", "TUN - Tunis - Carthage", "TUK - Turbat", "TRN - Turin", "TKU - Turku", "TCL - Tuscaloosa AL", "TGZ - Tuxtla Gutierrez", "TWF - Twin Falls ID", "TYR - Tyler TX", "UAH - Ua Huka", "UAP - Ua Pou", "UBJ - Ube", "UBA - Uberaba", "UDI - Uberlandia - Eduardo Gomes Airport", "UBP - Ubon Ratchathani - Muang Ubon Airport", "UDR - Udaipur - Dabok Airport", "UDE - Uden - Volkel Airport", "UTH - Udon Thani", "UFA - Ufa", "UHE - Uherske Hradiste", "UGO - Uige", "UPG - Ujung Pandang - Hasanudin Airport", "UCT - Ukhta", "ULN - Ulaanbaatar - Buyant Uhaa Airport", "UUD - Ulan-Ude", "HLH - Ulanhot", "ULB - Ulei", "USN - Ulsan", "ULD - Ulundi", "UME - Umea", "YUD - Umiujaq", "UTT - Umtata", "UNK - Unalakleet AK", "UNI - Union Island", "UNT - Unst (Shetland Island) - Baltasound Airport", "UPL - Upala", "JUV - Upernavik - Upernavik Heliport", "UTN - Upington", "UPP - Upolu Point HI", "YBE - Uranium City", "UGC - Urgench", "URM - Uriman", "OMH - Urmiehm (Orumieh)", "UPN - Uruapan", "URB - Urubupunga - Ernesto Pochler Airport", "URG - Uruguaiana - Ruben Berta Airport", "URC - Urumqi Xinjiang", "URZ - Uruzgan", "USH - Ushuaia - Islas Malvinas Airport", "UTP - Utapao (Pattaya)", "UCA - Utica NY - Oneida County Airport", "UII - Utila", "UMD - Uummannaq", "UDJ - Uzhgorod", "UKI - Ukiah CA", "VAA - Vaasa", "VXO - Vaexjoe", "EGE - Vail CO", "YVO - Val d Or", "VDZ - Valdez AK", "VLD - Valdosta GA", "VLC - Valencia", "VLN - Valencia", "VLL - Valladolid", "VAP - Valparaiso", "VDE - Valverde", "VAN - Van - Ferit Melen", "YVR - Vancouver - Vancouver International", "VRA - Varadero", "VNS - Varanasi", "VRK - Varkaus", "VAR - Varna", "VST - Vasteras", "VLU - Velikiye Luki (Welikije Luki)", "BRI - Bari", "VER - Veracruz", "VEL - Vernal UT", "VRB - Vero Beach\/Ft. Pierce FL", "VBS - Verona (Brescia) Montichiari", "VRN - Verona", "YYJ - Victoria", "VFA - Victoria Falls", "VID - Vidin", "VTE - Vientiane - Wattay", "VGO - Vigo", "VSA - Villahermosa", "VIJ - Virgin Gorda", "VIS - Visalia CA", "VBY - Visby", "VIT - Vitoria", "VIX - Vitoria", "VYD - Vryheid", "YWK - Wabush", "WGA - Wagga", "WLS - Wallis", "WVB - Walvis Bay", "WMB - Warrnambool", "WAW - Warsaw - Frederic Chopin", "BWI - Washington DC - Baltimore Washington International", "IAD - Washington DC - Dulles International", "DCA - Washington DC - Ronald Reagan National", "WAS - Washington DC", "WEI - Weipa", "WEL - Welkom", "WLG - Wellington", "GWT - Westerland", "WHK - Whakatane", "WRE - Whangarei", "YXY - Whitehorse", "HAP - Whitsunday Resort", "WYA - Whyalla", "WIC - Wick", "WHM - Wickham", "VIE - Wien (Vienna) - Vienna International", "VNO - Wilna (Vilnius)", "WUN - Wiluna", "ERS - Windhoek - Eros", "WDH - Windhoek - Hosea Kutako International", "YQG - Windsor Ontario", "YWG - Winnipeg International", "WOL - Wollongong", "UMR - Woomera", "WYN - Wyndham", "ACT - Waco TX", "ALW - Walla Walla WA", "ALO - Waterloo IA", "ATY - Watertown SD", "CWA - Wausau\/Stevens Point WI", "EAT - Wenatchee WA", "PBI - West Palm Beach FL", "WYS - West Yellowstone MT", "YXN - Whale Cove NT", "HPN - White Plains NY", "SPS - Wichita Falls TX", "ICT - Wichita KS", "AVP - Wilkes Barre\/Scranton PA", "IPT - Williamsport PA", "ISL - Williston ND", "ILM - Wilmington NC", "OLF - Wolf Point MT", "ORH - Worcester MA", "WRL - Worland WY", "WRG - Wrangell AK", "WUH - Wuhan Hubei", "XMN - Xiamen Fujian", "XIY - Xian - Xianyang Shaanxi", "YKM - Yakima WA", "YAK - Yakutat AK", "YKS - Yakutsk", "GAJ - Yamagata Junmachi", "ASK - Yamoussoukro", "YNB - Yanbu", "RGN - Yangon (Rangoon) - Mingaladon", "YAO - Yaounde", "YZF - Yellowknife", "YIH - Yichang Hubei", "YOK - Yokohama", "YUM - Yuma AZ", "ZCL - Zacatecas", "ZAD - Zadar", "ZAG - Zagreb - Pleso", "ZTH - Zakynthos", "ZAZ - Zaragoza", "PZH - Zhob", "ZND - Zinder", "OUZ - Zouerate", "ZRH - Zurich (Zurich) - Kloten", "AHO - Alghero Sassari", "VTZ - Visakhapatnam Airport (India)", "NJF - Al Najaf International Airport", "REP - Siem Reap International Airport", "WEH - Weihai International Airport", "BHU - Bhavnagar Airport - Gujarat", "DED - Jolly Grant Airport - Dehradun", "DHM - Gaggal Airport - Dharamshala", "CUC - Camilo Daza International Airport - Barrio La Laguna", "TRW - Bonriki International Airport - Kiribati", "GMP - Gimpo Int. Airport - Seoul", "XNB - Travel Mall EY BUS Station", "EBL - Erbil International Airport", "DVO - Francisco Bangoy International Airport", "ARM - Armidale Airport", "SKT - Sialkot International Airport", "BGY - Il Caravaggio International Airport", "BHY - Beihai Fucheng Airport", "HFE - Hefei Xinqiao International Airport", "VGA - Vijayawada Airport", "IXU - Aurangabad Airport", "IXM - Madurai Airport", "IXE - Mangalore Airport", "NPE - Hawke's Bay Airport", "AVV - Avalon Airport, Victoria", "CZX - Changzhou Benniu Airport", "MCO - Orlando International", "BCD - Bacolod-Silay International Airport", "PLM - Sultan Mahmud Badaruddin II", "HJR - Civil Aerodrome Khajuraho", "SVU - Savusavu Airport", "GAY - Gaya Airport", "DWC - Al Maktoum Int. Airport", "BHJ - SBhuj Airport (hyamji Krishna Verma)", "MUA - Munda Airport", "RPR - Swami Vivekananda Airport", "IDR - Indore - Devi Ahilya Bai Holkar", "CGO - Zhengzhou Xinzheng International Airport", "BUP - Bathinda", "IXZ - Veer Savarkar Intl", "IXL - Kushok Bakula Rimpoche", "IKA - Imam Khomeini Intl", "IXA - Agartala Airport", "KBV - Krabi", "CXR - Cam Ranh Intl", "DAD - Da Nang - International", "IXD - Allahabad", "CEB - Mactan-Cebu Int. Airport", "CRK - Angeles\/Mabalacat Airport", "USM - Samui Airport", "KUU - Kullu Manali Airport", "NSI - Yaoundé Nsimalen International Airport", "PGH - Pantnagar", "RJA - Rajahmundry Airport", "SAG - Shirdi Airport", "NGB - Lishe Intl", "BFI - Boeing Fld-King Co Int", "PQC - Phu Quoc Island International Airport", "DMK - Don Mueang Int", "GWL - Gwalior", "LUH - Ludhiana", "NPL - New Plymouth Airport", "ADV - Andover Airport ", "HLY - \tAnglesey Airport ", "BOL - \tBally Kelly Airport ", "BBP - Bembridge Airport ", "BWY - \tBentwaters St Airport ", "GSY - Binbrook Airport ", "BBS - Blackbushe Airport ", "BRF - Bradford Airport ", "BSH - Brighton Airport ", "SKL - Broadford Airport ", "BUT - Burtonwood Airport ", "ZFC - Bus Station Airport ", "CAX - Carlisle Airport ", "CEG - Chester Airport ", "ZBC - \tColmore Row Bus Stn Airport ", "OKH - Cottesmor RAF Airport ", "CRN - Cromarty Airport ", "DOC - \tDornoch Airport ", "EOI - Eday Airport ", "ENK - Enniskillen St. Angelo Airport ", "SWS - Fairwood Comm Airport ", "FAB - \tFarnborough Airport ", "FEA - Fetlar Airport ", "FZO - Filton Airport ", "FLH - Flotta Airport ", "FOA - Foula Airport ", "GLO - Gloucestershire Airport ", "EWY\t - \tGreenham RAF Airport ", "SWI - Gypsy Airport ", "HTF - Hatfield Airport ", "HAW - Haverfordwest Airport ", "FWM - Heliport Airport ", "LPH - \tHeliport Airport ", "RAY - Heliport Airport ", "HEN - \tHendon Airport ", "HYC - High Wycombe Airport ", "BEQ - Honington Airport ", "HOY - \tHoy Island Airport ", "IPW - Ipswich Airport ", "COL - \tIsle Of Coll Airport ", "CSA - Isle Of Colonsay Airport ", "FSS - Kinloss Airport ", "LKZ - Lakenheath RAF Airport ", "LEQ - \tLands End Airport ", "HRT - Linton-On-Ouse Airport ", "KNF - \tMarham RAF Airport ", "MHZ - Mildenhall Arpt Airport ", "KYN - \tMilton Keynes Airport ", "ULL - \tMull Airport ", "GXH - NAF Airport ", "ORM - \tNorthampton Airport ", "NHT - \tNortholt Airport ", "PPW - \tPapa Westray Airport ", "PZE - \tPenzance Airport ", "PSL - Perth Airport ", "PLH - \tPlymouth Airport ", "PME - \tPortsmouth Airport ", "BZZ - Raf Brize Norton Airport ", "ABB - \tRAF Station Airport ", "AYH - RAF Station Airport ", "FFD - \tRAF Station Airport ", "LMO - \tRAF Station Airport ", "LYE - \tRAF Station Airport ", "GQJ - \tRAF Station Airport ", "ODH - \tRAF Station Airport ", "SQZ - RAF Station Airport ", "UHF - RAF Station Airport ", "WTN - RAF Station Airport ", "DSA - Robin Hood Airport ", "RCS - Rochester Airport ", "NDY - Sanday Airport ", "SCS - Scatsta Airport ", "FKH - \tSculthorp RAF Airport ", "ESH - \tShoreham Airport ", "ISC - St Marys Airport ", "SOY - Stronsay Airport ", "TRE - \tTiree Airport ", "TSO - \tTresco Airport ", "UPV - Upavon Airport ", "BWF - Walney Island Airport ", "WXF - \tWeathersfield Raf Airport ", "WEM - West Malling Airport ", "WRY - Westray Airport ", "WHS - Whalsay Airport ", "WOB - \tWoodbridge RAF Airport ", "YEO - Yeovilton Airport "];