var request = require('request');
var CryptoJS = require("crypto-js");
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const { default: axios } = require('axios');
const fs = require('node:fs');
const { ObjectId } = require("mongodb");
const mongodbClient = require('../../../../_helpers/db');

const SIA_Config = {

    WSAP: `https://nodeA3.test.webservices.amadeus.com/1ASIWCLTSQ`,
    OID: `NDCSQ08SQ`,
    LSSUser: `WSSQASG`,
    password: `WOLJW3jt`,
    countryCode: `AU`,
    aggregatorID: `GEN`,
    agencyID: `02362662`,
    iataNumber: `02362662`,
    agencyName: `Airlink Service group`,
    airline: `SQ`,
    corpCode: ``
}

const SIA_CabinsCode = { 'Economy': 'ECO', 'Premium Economy': 'PRE', 'Business': 'BUS', 'First Class': 'FIR' }
const cabinCode = (Cabin) => SIA_CabinsCode[Cabin]

module.exports = {
    PnrRetrieve: async (req, res, next) => {
        req.query = { pnr_id: '65e53899378dd738b3375782' }
        const qry = req.query
        const pnr_id = qry.pnr_id
        // retrive pnr form the pnr_id
        const pnr_details = await mongodbClient.db('Airlink').collection('pnrs').findOne({ '_id': new ObjectId(pnr_id) })


        const { rq, rs } = await OrderRetrieve(pnr_details.pnr)
        console.log(rq, rs)
        const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true });
        const resStr = JSON.stringify((await parser.parse(rs)));
        let OrderRetrieve_aa = {
            rqTime: Date.now(),
            rq: rq,
            rs: rs,
            rsJson: resStr
        }

        const result = mongodbClient.db('Airlink').collection('pnrs').updateOne({ _id: new ObjectId(pnr_id) }, { $set: { OrderRetrieve: OrderRetrieve_aa } });


        return { provider: 'ndcSIA', pnr_id: pnr_id, apiResp: resStr }

    },
    flightAvailability: async (req, res, next) => {


        const testing_sia_resp_id = `65ea542524ac6a73974b998d`;
        const a = await getLog(testing_sia_resp_id, `AirShoppingRSjson`)
        return { provider: 'ndcSIA', sia_resp_id: testing_sia_resp_id, apiResp: JSON.stringify(a) }
        const search_param = req.body;
        var nonce = CryptoJS.enc.Utf8.parse(CryptoJS.lib.WordArray.random(8));
        var nonceEncoded = nonce.toString(CryptoJS.enc.Base64);

        // Generate created timestamp
        var timestamp = (new Date()).toISOString();
        var created = CryptoJS.enc.Utf8.parse(timestamp);

        // Get LSS password from environment variable and hash password
        var passwordHash = CryptoJS.SHA1(SIA_Config.password);

        // Generate password digest
        var passwordDigest = CryptoJS.SHA1(nonce.concat(created).concat(passwordHash)).toString(CryptoJS.enc.Base64);

        //Set Global Variables
        console.log("wsse-Password", passwordDigest);
        console.log("wsse-Nonce", nonceEncoded);
        console.log("wsse-Created", timestamp);

        var _from = (search_param.from).split(" - ")
        var _dest = (search_param.to).split(" - ")

        //search_param.departure = '2023-10-10'
        // generating Request
        var _Request = `
            <Request>`
        if (search_param.journeytype == 'oneway') {
            _Request += `
                <FlightRequest>
                    <OriginDestRequest>
                        <OriginDepRequest>
                            <IATA_LocationCode>${_from[0]}</IATA_LocationCode>
                            <Date>${search_param.deptDate}</Date>
                        </OriginDepRequest>
                        <DestArrivalRequest>
                            <IATA_LocationCode>${_dest[0]}</IATA_LocationCode>
                        </DestArrivalRequest>
                    </OriginDestRequest>
                </FlightRequest>`

        }
        else if (search_param.journeytype == 'return') {
            const dates = search_param.returnDate.split(" to ");
            _Request += `
                <FlightRequest>
                    <OriginDestRequest>
                        <OriginDepRequest>
                            <IATA_LocationCode>${_from[0]}</IATA_LocationCode>
                            <Date>${dates[0]}</Date>
                        </OriginDepRequest>
                        <DestArrivalRequest>
                            <IATA_LocationCode>${_dest[0]}</IATA_LocationCode>
                        </DestArrivalRequest>
                    </OriginDestRequest>
                    <OriginDestRequest>
                        <OriginDepRequest>
                            <IATA_LocationCode>${_dest[0]}</IATA_LocationCode>
                            <Date>${dates[1]}</Date>
                        </OriginDepRequest>
                        <DestArrivalRequest>
                            <IATA_LocationCode>${_from[0]}</IATA_LocationCode>
                        </DestArrivalRequest>
                    </OriginDestRequest>
                </FlightRequest>`
        }


        _Request += `
                <Paxs>
                    <Pax>
                        <PaxID>ADT1</PaxID>
                        <PTC>ADT</PTC>
                    </Pax>`

        const nAdt = parseInt(search_param.nAdt)
        if (nAdt > 1)
            for (let i = 2; i <= nAdt; i++)
                _Request += `
                    <Pax>
                        <PaxID>ADT${i}</PaxID>
                        <PTC>ADT</PTC>
                    </Pax>`

        const nChd = parseInt(search_param.nChd)
        if (nChd > 0)
            for (let i = 1; i <= nChd; i++)
                _Request += `
                    <Pax>
                        <PaxID>CHD${i}</PaxID>
                        <PTC>CHD</PTC>
                    </Pax>`

        const nInf = parseInt(search_param.nInf)
        if (nInf > 0)
            for (let i = 1; i <= nInf; i++)
                _Request += `
                    <Pax>
                        <PaxID>INF${i}</PaxID>
                        <PTC>INF</PTC>
                    </Pax>`
        _Request += `
                </Paxs>
                <ShoppingCriteria>
                    <CabinTypeCriteria>
                        <CabinTypeName>${cabinCode(search_param.Cabin)}</CabinTypeName>
                    </CabinTypeCriteria>
                    <!-- * Fare preference -If cabin type is present, fare preference will be ignored -->
                    <!-- <FarePreferences><FareCodes><Code><Code>{{farePreference}}</Code></Code></FareCodes></FarePreferences> -->
                    <!--Fare preference * -->
                   <!--
                        <PricingMethodCriteria>
                            <BestPricingOption>CHJ</BestPricingOption>
                        </PricingMethodCriteria>
                  -->
                </ShoppingCriteria>
                <!-- * Currency Override -->
                <!-- <ResponseParameters><PricingParameter><OverrideCurCode>CNY</OverrideCurCode></PricingParameter><LangUsage><LangCode>ZH</LangCode></LangUsage>
                        </ResponseParameters> -->
                <!-- Currency Override * -->
                <!-- * Corporate Code -->
                <ProgramCriteria>
                    <ProgramAccount>
                        <AccountID>${SIA_Config.corpCode}</AccountID>
                    </ProgramAccount>
                    <ProgramOwner>
                        <Carrier>
                            <AirlineDesigCode>SQ</AirlineDesigCode>
                        </Carrier>
                    </ProgramOwner>
                </ProgramCriteria>
                <!--Corporate Code * -->
            </Request>`

        var reqBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sec="http://xml.amadeus.com/2010/06/Security_v1" xmlns:link="http://wsdl.amadeus.com/2010/06/ws/Link_v1" xmlns:ses="http://xml.amadeus.com/2010/06/Session_v3" xmlns:ns="http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ">
            ${xml_req_header(`http://webservices.amadeus.com/NDC_AirShopping_18.1`)}
            <soapenv:Body>
                <AirShoppingRQ xmlns="http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ">
                    <PayloadAttributes>
                        <Version>18.1</Version>
                    </PayloadAttributes>
                    <PointOfSale>
                        <Country>
                            <CountryCode>${SIA_Config.countryCode}</CountryCode>
                        </Country>
                    </PointOfSale>
                    <Party>
                        <Recipient>
                            <ORA>
                                <AirlineDesigCode>${SIA_Config.airline}</AirlineDesigCode>
                            </ORA>
                        </Recipient>
                        <Participant>
                            <Aggregator>
                                <AggregatorID></AggregatorID>
                            </Aggregator>
                        </Participant>
                        <Sender>
                            <TravelAgency>
                                <AgencyID>${SIA_Config.agencyID}</AgencyID>
                                <IATA_Number>${SIA_Config.iataNumber}</IATA_Number>
                                <Name>${SIA_Config.agencyName}</Name>
                            </TravelAgency>
                        </Sender>
                    </Party>
                    ${_Request}
                </AirShoppingRQ>
            </soapenv:Body>
        </soapenv:Envelope>`;
        console.log(reqBody)

        var myHeaders = new Headers();
        myHeaders.append("SOAPAction", "http://webservices.amadeus.com/NDC_AirShopping_18.1");
        myHeaders.append("Content-Type", "application/xml");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: reqBody,
            redirect: 'follow'
        };

        const apiResp = await fetch(SIA_Config.WSAP, requestOptions).then(r => r.text());
        fs.writeFileSync('./respXML.txt', apiResp);
        const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true });
        let jObj = JSON.stringify(parser.parse(apiResp));
        console.log(jObj)
        fs.writeFileSync('./respJSON.txt', jObj);

        let AirShoppingRQ = {

            agency_id: new ObjectId(req.session.agency['_id']),
            AirShoppingTime: Date.now(),
            AirShoppingRQ: reqBody,
            AirShoppingRS: apiResp,
            AirShoppingRSjson: jObj
        }
        const sia_resp_id = await mongodbClient.db('Airlink').collection('sia_log').insertOne(AirShoppingRQ);

        return { provider: 'ndcSIA', sia_resp_id: sia_resp_id.insertedId, apiResp: jObj }

        var options = {
            'method': 'POST',
            'url': 'https://nodeA3.test.webservices.amadeus.com/1ASIWCLTSQ',
            'headers': {
                'SOAPAction': 'http://webservices.amadeus.com/NDC_AirShopping_18.1',
                'Content-Type': 'text/xml;charset=utf-8'
            },
            data: reqBody

        };

        const sia_response = await axios.request(options)
        console.log(sia_response)
        return { sia_response: sia_response.data }
        console.log(xml2json.toJson(sia_response.data));
        return (xml2json.toJson(sia_response.data))

        await request(options, function (error, response) {
            if (error) throw new Error(error);

        });
    },
    OfferPrice: async (req, res, next) => {
        const testing_sia_resp_id = `65ea542524ac6a73974b998d`;
        const x = await getLog(testing_sia_resp_id, `OfferPriceRSjson`)
        return { provider: 'ndcSIA', sia_resp_id: testing_sia_resp_id, apiResp: x }

        const search_param = req.body;
        console.log(search_param)
        const sia_resp_id = req.body.sia_resp_id;
        const a = await getLog(sia_resp_id, `AirShoppingRSjson`)

        const paxList = a?.['Envelope']?.['Body']?.['AirShoppingRS']?.['Response']?.['DataLists']?.['PaxList']
        const Offer = (a?.['Envelope']?.['Body']?.['AirShoppingRS']?.['Response']?.['OffersGroup']?.['CarrierOffers']?.['Offer'].filter((i) => { console.log(i); return i.OfferID == search_param.OfferID }))?.[0]

        console.log('Offer', search_param, a, paxList, Offer)
        //return search_param

        var _Request = `
        <Request>`

        // preparing PaxList
        var PaxList = `
            <PaxList>`
        for (const [PaxID, pax] of Object.entries(paxList)) {
            PaxList += `
                <Pax>
                    <PaxID>${pax.PaxID}</PaxID>
                    <PTC>${pax.PTC}</PTC>
                </Pax>`
        }
        PaxList += `
            </PaxList>`

        // prepating SelectedOffer
        var SelectedOfferItem = `
                    <SelectedOfferItem>`

        SelectedOfferItem += `    
                        <OfferItemRefID>${Offer.OfferItem.OfferItemID}</OfferItemRefID>`
        if (Offer?.OfferItem?.FareDetail?.hasOwnProperty('PassengerRefs')) {
            SelectedOfferItem += `
                        <PaxRefID>${Offer.OfferItem.FareDetail['PassengerRefs']}</PaxRefID>`
        } else {
            Offer?.OfferItem?.FareDetail?.forEach((FareDetail) => {
                if (FareDetail?.hasOwnProperty('PassengerRefs')) {
                    SelectedOfferItem += `
                        <PaxRefID>${FareDetail['PassengerRefs']}</PaxRefID>`
                }
            })
        }
        SelectedOfferItem += `
                    </SelectedOfferItem>`

        _Request += `
            <DataLists>
                ${PaxList}
            </DataLists>
            <PricedOffer>
                <SelectedOffer>
                    <OfferRefID>${Offer.OfferID}</OfferRefID>
                    <OwnerCode>${SIA_Config.airline}</OwnerCode>
                    <ShoppingResponseRefID>0</ShoppingResponseRefID>
                    ${SelectedOfferItem}
                    <!--
                    <SelectedOfferItem>
                        <OfferItemRefID>SP1F-14345891264338726008-37-1</OfferItemRefID>
                        <PaxRefID>PAX1</PaxRefID>
                        <PaxRefID>PAX11</PaxRefID>
                    </SelectedOfferItem>
                    <SelectedOfferItem>
                        <OfferItemRefID>SP1F-10816693449376346951-13-2</OfferItemRefID>
                        <PaxRefID>PAX1</PaxRefID>
                        <SelectedALaCarteOfferItem>
                            <Qty>10</Qty>
                        </SelectedALaCarteOfferItem>
                    </SelectedOfferItem>
                    -->
                </SelectedOffer>
            </PricedOffer>
            <ResponseParameters>
                <LangUsage>
                    <LangCode>EN</LangCode>
                </LangUsage>
            </ResponseParameters>
        </Request>`

        var reqBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sec="http://xml.amadeus.com/2010/06/Security_v1" xmlns:link="http://wsdl.amadeus.com/2010/06/ws/Link_v1" xmlns:ses="http://xml.amadeus.com/2010/06/Session_v3" xmlns:ns="http://www.iata.org/IATA/2015/00/2018.1/OfferPriceRQ">
            ${xml_req_header(`http://webservices.amadeus.com/NDC_OfferPrice_18.1`)}
            <soapenv:Body>
                <OfferPriceRQ xmlns="http://www.iata.org/IATA/2015/00/2018.1/OfferPriceRQ">
                    <PayloadAttributes>
                        <Version>18.1</Version>
                    </PayloadAttributes>
                    <PointOfSale>
                        <Country>
                            <CountryCode>${SIA_Config.countryCode}</CountryCode>
                        </Country>
                    </PointOfSale>
                    <Party>
                        <Recipient>
                            <ORA>
                                <AirlineDesigCode>${SIA_Config.airline}</AirlineDesigCode>
                            </ORA>
                        </Recipient>
                        <Participant>
                            <Aggregator>
                                <AggregatorID></AggregatorID>
                            </Aggregator>
                        </Participant>
                        <Sender>
                            <TravelAgency>
                                <AgencyID>${SIA_Config.agencyID}</AgencyID>
                                <IATA_Number>${SIA_Config.iataNumber}</IATA_Number>
                                <Name>${SIA_Config.agencyName}</Name>
                            </TravelAgency>
                        </Sender>
                    </Party>
                    ${_Request}
                </OfferPriceRQ>
            </soapenv:Body>
        </soapenv:Envelope>`;
        console.log(reqBody)
        //return reqBody;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/xml");
        myHeaders.append("CHAR", "UTF-8");
        myHeaders.append("SOAPAction", "http://webservices.amadeus.com/NDC_OfferPrice_18.1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: reqBody,
            redirect: 'follow'
        };

        const apiResp = await fetch(SIA_Config.WSAP, requestOptions).then(r => r.text());
        fs.writeFileSync('./respXML.txt', apiResp);
        const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true });
        let jObj = JSON.stringify(parser.parse(apiResp));
        let OfferPrice = {
            OfferPriceRQTime: Date.now(),
            OfferPriceRQ: reqBody,
            OfferPriceRS: apiResp,
            OfferPriceRSjson: jObj
        }
        updateLog(sia_resp_id, OfferPrice)
        console.log(jObj)
        fs.writeFileSync('./respJSON.txt', jObj);
        return { provider: 'ndcSIA', sia_resp_id: sia_resp_id, apiResp: jObj }
    },
    getOfferPrice: async (req, res, next) => {
        const search_param = req.body;
        console.log(search_param)
        const sia_resp_id = req.body.sia_resp_id;
        const a = await getLog(sia_resp_id, `OfferPriceRSjson`)
        return { provider: 'ndcSIA', sia_resp_id: sia_resp_id, apiResp: a }
    },
    OrderCreate: async (req, res, next) => {

        const search_param = req.body;
        const sia_resp_id = req.body.sia_resp_id;
        const a = await getLog(sia_resp_id, `OfferPriceRSjson`)

        const paxList = a?.['Envelope']?.['Body']?.['OfferPriceRS']?.['Response']?.['DataLists']?.['PaxList']
        const Offer = a?.['Envelope']?.['Body']?.['OfferPriceRS']?.['Response']?.['PricedOffer']?.['Offer']

        console.log('Offer', search_param)


        // preparing PaxList
        var PaxList = `
            <PaxList>
                `

        if (paxList?.Pax?.hasOwnProperty('PaxID')) {

            PaxList += `
            <Pax>
                <PaxID>${paxList?.Pax?.PaxID}</PaxID>
                <PTC>${paxList?.Pax?.PTC}</PTC>
                <Individual>
                    <IndividualID>${paxList?.Pax?.PaxID}</IndividualID>
                    <Birthdate>${search_param.PaxData[paxList?.Pax?.PaxID]?.dob || ``}</Birthdate>
                    <TitleName>${search_param.PaxData[paxList?.Pax?.PaxID]?.title || ``}</TitleName>
                    <GivenName>${search_param.PaxData[paxList?.Pax?.PaxID]?.firstname || ``}</GivenName>
                    <Surname>${search_param.PaxData[paxList?.Pax?.PaxID]?.lastname || ``}</Surname>
                </Individual>
            </Pax>`
        } else {
            paxList?.Pax?.forEach((Pax) => {
                if (Pax?.hasOwnProperty('PaxID')) {
                    PaxList += `
            <Pax>
                <PaxID>${Pax?.PaxID}</PaxID>
                <PTC>${Pax?.PTC}</PTC>
                <Individual>
                    <IndividualID>${Pax?.PaxID}</IndividualID>
                    <Birthdate>${search_param.PaxData[Pax?.PaxID]?.dob || ``}</Birthdate>
                    <TitleName>${search_param.PaxData[Pax?.PaxID]?.title || ``}</TitleName>
                    <GivenName>${search_param.PaxData[Pax?.PaxID]?.firstname || ``}</GivenName>
                    <Surname>${search_param.PaxData[Pax?.PaxID]?.lastname || ``}</Surname>
                </Individual>
            </Pax>`
                }
            })
        }


        PaxList += `
            </PaxList>`

        var ContactInfoList = `
            <ContactInfoList>
                <ContactInfo>
                    <Phone>
                        <LabelText>Mobile</LabelText>
                        <PhoneNumber>${search_param.contact.phone}</PhoneNumber>
                    </Phone>
                    <EmailAddress>
                        <EmailAddressText>${search_param.contact.email}</EmailAddressText>
                    </EmailAddress>
                </ContactInfo>
                <ContactInfo>
                    <ContactTypeText>Notification</ContactTypeText>
                    <IndividualRefID>PAX1</IndividualRefID>
                    <Phone>
                        <LabelText>Mobile</LabelText>
                        <PhoneNumber>${search_param.contact.phone}</PhoneNumber>
                    </Phone>
                    <EmailAddress>
                        <EmailAddressText>${search_param.contact.email}</EmailAddressText>
                    </EmailAddress>
                </ContactInfo>
            </ContactInfoList>
        `


        // prepating SelectedOffer
        // prepating SelectedOffer
        var SelectedOfferItem = `
                    <SelectedOfferItem>`

        SelectedOfferItem += `    
                        <OfferItemID>${Offer.OfferItem.OfferItemID}</OfferItemID>`
        if (paxList?.Pax?.hasOwnProperty('PaxID')) {
            SelectedOfferItem += `
                        <PaxRefID>${paxList.Pax.PaxID}</PaxRefID>`
        } else {
            paxList?.Pax?.forEach((Pax) => {
                if (Pax?.hasOwnProperty('PaxID')) {
                    SelectedOfferItem += `
                        <PaxRefID>${Pax['PaxID']}</PaxRefID>`
                }
            })
        }
        SelectedOfferItem += `
                    </SelectedOfferItem>`

        var _Request = `
        <Request>
            <CreateOrder>
                <SelectedOffer>
                    <OfferID>${Offer.OfferID}</OfferID>
                    <OwnerCode>${SIA_Config.airline}</OwnerCode>
                    <ShoppingResponseRefID/>
                    ${SelectedOfferItem}
                </SelectedOffer>
            </CreateOrder>
            <DataLists>
            ${ContactInfoList}
            ${PaxList}
            </DataLists>
        </Request>`

        var reqBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sec="http://xml.amadeus.com/2010/06/Security_v1" xmlns:link="http://wsdl.amadeus.com/2010/06/ws/Link_v1" xmlns:ses="http://xml.amadeus.com/2010/06/Session_v3" xmlns:ns="http://www.iata.org/IATA/2015/00/2018.1/OrderCreateRQ">
            ${xml_req_header(`http://webservices.amadeus.com/NDC_OrderCreate_18.1`)}
            <soapenv:Body>
                <OrderCreateRQ xmlns="http://www.iata.org/IATA/2015/00/2018.1/OrderCreateRQ">
                    <PayloadAttributes>
                        <Version>18.1</Version>
                    </PayloadAttributes>
                    <PointOfSale>
                        <Country>
                            <CountryCode>${SIA_Config.countryCode}</CountryCode>
                        </Country>
                    </PointOfSale>
                    <Party>
                        <Recipient>
                            <ORA>
                                <AirlineDesigCode>${SIA_Config.airline}</AirlineDesigCode>
                            </ORA>
                        </Recipient>
                        <Participant>
                            <Aggregator>
                                <AggregatorID></AggregatorID>
                            </Aggregator>
                        </Participant>
                        <Sender>
                            <TravelAgency>
                                <AgencyID>${SIA_Config.agencyID}</AgencyID>
                                <IATA_Number>${SIA_Config.iataNumber}</IATA_Number>
                                <Name>${SIA_Config.agencyName}</Name>
                            </TravelAgency>
                        </Sender>
                    </Party>
                    ${_Request}
                </OrderCreateRQ>
            </soapenv:Body>
        </soapenv:Envelope>`;
        console.log(reqBody)
        //return reqBody

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/xml");
        myHeaders.append("CHAR", "UTF-8");
        myHeaders.append("SOAPAction", "http://webservices.amadeus.com/NDC_OrderCreate_18.1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: reqBody,
            redirect: 'follow'
        };

        const apiResp = await fetch(SIA_Config.WSAP, requestOptions).then(r => r.text());
        console.log('apiResp', apiResp)
        fs.writeFileSync('./respXML.txt', apiResp);
        const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true });
        const jObj = await parser.parse(apiResp);
        let resStr = JSON.stringify(jObj);
        let OrderCreate = {
            OrderCreateRQTime: Date.now(),
            OrderCreateRQ: reqBody,
            OrderCreateRS: apiResp,
            OrderCreateRSjson: resStr
        }
        updateLog(sia_resp_id, OrderCreate)


        // updating database as per the pnr
        const Response = jObj?.Envelope?.Body?.OrderViewRS?.Response
        if (Response?.Order?.OrderID) {

            const { rq, rs } = await OrderRetrieve(Response?.Order?.OrderID)
            const resStr = JSON.stringify((await parser.parse(rs)));

            const pnrObj = {
                agent: new ObjectId(req.session.agency._id),
                provider: 'ndcSIA',
                log_id: new ObjectId(sia_resp_id),
                pnr: Response?.Order?.OrderID,
                queue: `quote`,
                user: new ObjectId(req.session.auth._id),
                PaymentTimeLimitDateTime: Response?.Order?.PaymentTimeLimitDateTime,
                PriceGuaranteeTimeLimitDateTime: Response?.Order?.OrderItem?.PriceGuaranteeTimeLimitDateTime,
                OrderRetrieve: {
                    rqTime: Date.now(),
                    rq: rq,
                    rs: rs,
                    rsJson: resStr
                }
            }
            const pnrs = await mongodbClient.db('Airlink').collection('pnrs').insertOne(pnrObj)
        }


        console.log(jObj)
       
        return { provider: 'ndcSIA', pnr_id: pnrs.insertedId, apiResp: resStr }
    },

    OrderCancel: async (req, res, next) => {
        const jObj = JSON.parse(`{"?xml":{"@_version":"1.0","@_encoding":"UTF-8"},"Envelope":{"Header":{"To":"http://www.w3.org/2005/08/addressing/anonymous","From":{"Address":"https://nodeA3.test.webservices.amadeus.com/1ASIWCLTSQ"},"Action":"http://webservices.amadeus.com/NDC_OrderCreate_18.1","MessageID":"urn:uuid:49dbdbf4-362d-3554-1195-e312c4a7a0ba","RelatesTo":{"#text":"3aa0046c-f5df-4de3-8df7-7818f598f0d8","@_RelationshipType":"http://www.w3.org/2005/08/addressing/reply"},"Session":{"SessionId":"01EAFQZDKE","SequenceNumber":1,"SecurityToken":"1TE5GSO8VVT3A25TVZ6CH2QK8I","@_TransactionStatusCode":"End"}},"Body":{"OrderViewRS":{"PayloadAttributes":{"Version":18.1},"Response":{"DataLists":{"BaggageAllowanceList":{"BaggageAllowance":[{"BaggageAllowanceID":"FBA1","TypeCode":"Checked","WeightAllowance":{"MaximumWeightMeasure":{"#text":35,"@_UnitCode":"Kilogram"},"ApplicablePartyText":"Traveler"}},{"BaggageAllowanceID":"FBA2","TypeCode":"Checked","WeightAllowance":{"MaximumWeightMeasure":{"#text":30,"@_UnitCode":"Kilogram"},"ApplicablePartyText":"Traveler"}}]},"ContactInfoList":{"ContactInfo":[{"ContactInfoID":"CTCPAX1_1","ContactTypeText":"NOTIFICATION","IndividualRef":"PAX1","Phone":{"LabelText":"MOBILE","CountryDialingCode":91,"PhoneNumber":9988767765},"EmailAddress":{"EmailAddressText":"PRAVEEN@MANNTRAVEL.COM.AU"}},{"ContactInfoID":"CTC_1","ContactTypeText":"STANDARD","Phone":{"LabelText":"MOBILE","PhoneNumber":919988767765},"EmailAddress":{"EmailAddressText":"PRAVEEN@MANNTRAVEL.COM.AU"}}]},"InstructionsList":{"Instruction":{"FreeFormTextInstruction":{"Remark":"BOOKING SITE AU"},"@_ListKey":"OSI_30"}},"PaxJourneyList":{"PaxJourney":[{"PaxJourneyID":"FLT1","Duration":"PT7H50M","PaxSegmentRefID":"SEG1"},{"PaxJourneyID":"FLT2","Duration":"PT5H35M","PaxSegmentRefID":"SEG2"}]},"PaxList":{"Pax":{"PaxID":"PAX1","PTC":"ADT","Individual":{"IndividualID":"PAX1","Birthdate":"2002-02-02","TitleName":"MR","GivenName":"PRAVEEN","Surname":"SINHA"}}},"PaxSegmentList":{"PaxSegment":[{"PaxSegmentID":"SEG1","Dep":{"IATA_LocationCode":"MEL","TerminalName":2,"AircraftScheduledDateTime":"2024-04-06T10:35:00"},"Arrival":{"IATA_LocationCode":"SIN","TerminalName":0,"AircraftScheduledDateTime":"2024-04-06T15:25:00"},"MarketingCarrierInfo":{"CarrierDesigCode":"SQ","CarrierName":"SINGAPORE AIRLINES","MarketingCarrierFlightNumberText":238,"RBD_Code":"P"},"OperatingCarrierInfo":{"CarrierDesigCode":"SQ","CarrierName":"SINGAPORE AIRLINES","Disclosure":{"DisclosureID":"DIS1","Desc":{"DescID":"DES1","DescText":"SINGAPORE AIRLINES"}}},"DatedOperatingLeg":{"DatedOperatingLegID":"LEG1","Dep":{"IATA_LocationCode":"MEL","AircraftScheduledDateTime":"2024-04-06T10:35:00"},"Arrival":{"IATA_LocationCode":"SIN","AircraftScheduledDateTime":"2024-04-06T15:25:00"},"IATA_AircraftType":{"IATA_AircraftTypeCode":359}}},{"PaxSegmentID":"SEG2","Dep":{"IATA_LocationCode":"SIN","TerminalName":3,"AircraftScheduledDateTime":"2024-04-08T02:35:00"},"Arrival":{"IATA_LocationCode":"DEL","TerminalName":3,"AircraftScheduledDateTime":"2024-04-08T05:40:00"},"MarketingCarrierInfo":{"CarrierDesigCode":"SQ","CarrierName":"SINGAPORE AIRLINES","MarketingCarrierFlightNumberText":402,"RBD_Code":"M"},"OperatingCarrierInfo":{"CarrierDesigCode":"SQ","CarrierName":"SINGAPORE AIRLINES","Disclosure":{"DisclosureID":"DIS2","Desc":{"DescID":"DES2","DescText":"SINGAPORE AIRLINES"}}},"DatedOperatingLeg":{"DatedOperatingLegID":"LEG2","Dep":{"IATA_LocationCode":"SIN","AircraftScheduledDateTime":"2024-04-08T02:35:00"},"Arrival":{"IATA_LocationCode":"DEL","AircraftScheduledDateTime":"2024-04-08T05:40:00"},"IATA_AircraftType":{"IATA_AircraftTypeCode":787}}}]},"PriceClassList":{"PriceClass":{"PriceClassID":"FF11","Name":"SIN - PEY ACC FF1 STANDARD"}},"ServiceDefinitionList":{"ServiceDefinition":[{"ServiceDefinitionID":"BAGALLOW_1","Name":"Bag allowances","Description":{"DescID":"Bag allowances"},"ServiceDefinitionAssociation":{"BaggageAllowanceRefID":"FBA1"}},{"ServiceDefinitionID":"BAGALLOW_2","Name":"Bag allowances","Description":{"DescID":"Bag allowances"},"ServiceDefinitionAssociation":{"BaggageAllowanceRefID":"FBA2"}}]}},"Order":{"OrderID":"SQ_55V7WH","OwnerCode":"SQ","PaymentTimeLimitDateTime":"2024-03-05T12:00:00.000Z","BookingRef":{"BookingID":"55V7WH","BookingEntity":{"Carrier":{"AirlineDesigCode":"SQ"}}},"OrderItem":{"OrderItemID":"SQ_55V7WH_AIR-1-2","OwnerCode":"SQ","StatusCode":"NOT ENTITLED","PriceGuaranteeTimeLimitDateTime":"2024-03-01T13:00:00Z","FareDetail":{"PassengerRefs":"PAX1","Price":{"TotalAmount":{"DetailCurrencyPrice":{"Total":{"#text":2034.61,"@_Code":"AUD"}}},"BaseAmount":{"#text":1866,"@_Code":"AUD"},"Taxes":{"Total":{"#text":168.61,"@_Code":"AUD"},"Breakdown":{"Tax":[{"Amount":{"#text":60,"@_Code":"AUD"},"Nation":"DP","TaxCode":"AU"},{"Amount":{"#text":8.68,"@_Code":"AUD"},"Nation":"SE","TaxCode":"WG"},{"Amount":{"#text":25.33,"@_Code":"AUD"},"Nation":"DE","TaxCode":"WY"},{"Amount":{"#text":12.4,"@_Code":"AUD"},"Nation":"DE","TaxCode":"L7"},{"Amount":{"#text":9.2,"@_Code":"AUD"},"Nation":"AE","TaxCode":"OP"},{"Amount":{"#text":53,"@_Code":"AUD"},"Nation":"AD","TaxCode":"SG"}]}}},"FareComponent":[{"FareBasis":{"FareBasisCode":{"Code":"P14AUO"},"CabinType":{"CabinTypeCode":{"#text":4,"@_type":"xs:string"},"CabinTypeName":{"#text":"Economic Premium","@_type":"xs:string"}}},"FareRules":{"Penalty":{"Details":{"Detail":[{"Type":"Cancel","Amounts":{"Amount":[{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ADM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ADT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ADX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount with sale currency"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"ANM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"ANT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"ANX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BDM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BDT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BDX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"BNM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"BNT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"BNX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure no show"}}]}},{"Type":"Change","Amounts":{"Amount":[{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"ADM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount with sale currency"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"ANM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"BDM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"BNM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure no show"}}]}}]},"@_CancelFeeInd":"true","@_ChangeFeeInd":"true"}},"PriceClassRef":"FF11","SegmentRefs":"SEG1"},{"FareBasis":{"FareBasisCode":{"Code":"P14AUO"},"CabinType":{"CabinTypeCode":{"#text":5,"@_type":"xs:string"},"CabinTypeName":{"#text":"ECONOMY","@_type":"xs:string"}}},"FareRules":{"Penalty":{"Details":{"Detail":[{"Type":"Cancel","Amounts":{"Amount":[{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ADM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ADT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ADX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount with sale currency"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"ANM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"ANT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"ANX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BDM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BDT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BDX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"BNM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"BNT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure no show"}},{"CurrencyAmountValue":{"#text":520,"@_Code":"AUD"},"AmountApplication":"BNX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure no show"}}]}},{"Type":"Change","Amounts":{"Amount":[{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"ADM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount after departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"ADX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount with sale currency"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"ANM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"ANX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount after departure no show"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"BDM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":70,"@_Code":"AUD"},"AmountApplication":"BDX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNC","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount for the ticket before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNI","ApplicableFeeRemarks":{"Remark":"Revalidation minimum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":0,"@_Code":"AUD"},"AmountApplication":"BNM","ApplicableFeeRemarks":{"Remark":"Reissue/Refund minimum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNT","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount for the ticket before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNU","ApplicableFeeRemarks":{"Remark":"Revalidation maximum penalty amount before departure no show"}},{"CurrencyAmountValue":{"#text":260,"@_Code":"AUD"},"AmountApplication":"BNX","ApplicableFeeRemarks":{"Remark":"Reissue/Refund maximum penalty amount before departure no show"}}]}}]},"@_CancelFeeInd":"true","@_ChangeFeeInd":"true"}},"PriceClassRef":"FF11","SegmentRefs":"SEG2"}],"Remarks":{"Remark":["FC-MEL SQ SIN SQ DEL1253.19NUC1253.19END ROE1.488998","FE-PAX *M*CHNG FEE APPLY / REFUND FEE APPLY / NO SHOW FEE APPLY|02362662||"]}},"Price":{"TotalAmount":{"#text":2034.61,"@_CurCode":"AUD"},"BaseAmount":{"#text":1866,"@_CurCode":"AUD"},"TaxSummary":{"TotalTaxAmount":{"#text":168.61,"@_CurCode":"AUD"}}},"Service":[{"ServiceID":"SEG1_PAX1","StatusCode":"HK","PaxRefID":"PAX1","ServiceAssociations":{"ServiceDefinitionRef":{"ServiceDefinitionRefID":"BAGALLOW_1","PaxSegmentRefID":"SEG1"}}},{"ServiceID":"SEG2_PAX1","StatusCode":"HK","PaxRefID":"PAX1","ServiceAssociations":{"ServiceDefinitionRef":{"ServiceDefinitionRefID":"BAGALLOW_2","PaxSegmentRefID":"SEG2"}}}]},"TotalPrice":{"TotalAmount":{"#text":2034.61,"@_CurCode":"AUD"},"BaseAmount":{"#text":1866,"@_CurCode":"AUD"},"TaxSummary":{"TotalTaxAmount":{"#text":168.61,"@_CurCode":"AUD"}}}}}}}}}`)
        const Response = jObj?.Envelope?.Body?.OrderViewRS?.Response

        const pnrObj = {
            provider: 'ndcSIA',
            pnr: Response?.Order?.OrderID,
            queue: `quote`,
            user: req.session.auth._id,
            PaymentTimeLimitDateTime: Response?.Order?.PaymentTimeLimitDateTime,
            PriceGuaranteeTimeLimitDateTime: Response?.Order?.OrderItem?.PriceGuaranteeTimeLimitDateTime,
        }

        const a1 = await mongodbClient.db('Airlink').collection('pnrs').insertOne(pnrObj)
    },
    view: (req, res, next) => {
        console.log('in search interface, do:view')
        res.send('view')
    },
    getResult: async (req, res, next) => {
        var search_param = req.query;
        var response = await SIA.search(search_param)
        console.log('in search interface, do:search')
        res.json(response)
    }
}


async function getLog(sia_resp_id, name) {
    try {
        const a = await mongodbClient.db('Airlink').collection('sia_log').findOne({ _id: new ObjectId(sia_resp_id) }, { [name]: 1 })
        console.log('aaaaaaaaaaaaa', a)
        return JSON.parse(a?.[name] || {})
    } catch (e) {
        return e
    }
}

function updateLog(sia_resp_id, newData) {
    const result = mongodbClient.db('Airlink').collection('sia_log').updateOne({ _id: new ObjectId(sia_resp_id) }, { $set: newData });
    return true
}
async function createLog() {

}

async function OrderRetrieve(pnr) {
    var reqBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sec="http://xml.amadeus.com/2010/06/Security_v1" xmlns:link="http://wsdl.amadeus.com/2010/06/ws/Link_v1" xmlns:ses="http://xml.amadeus.com/2010/06/Session_v3" xmlns:ns="http://www.iata.org/IATA/2015/00/2018.1/OrderRetrieveRQ">
            ${xml_req_header(`http://webservices.amadeus.com/NDC_OrderRetrieve_18.1`)}
            <soapenv:Body>
                <OrderRetrieveRQ xmlns="http://www.iata.org/IATA/2015/00/2018.1/OrderRetrieveRQ">
                    <PayloadAttributes>
                        <Version>18.1</Version>
                    </PayloadAttributes>
                    <PointOfSale>
                        <Country>
                            <CountryCode>${SIA_Config.countryCode}</CountryCode>
                        </Country>
                    </PointOfSale>
                    <Party>
                        <Recipient>
                            <ORA>
                                <AirlineDesigCode>${SIA_Config.airline}</AirlineDesigCode>
                            </ORA>
                        </Recipient>
                        <Participant>
                            <Aggregator>
                                <AggregatorID></AggregatorID>
                            </Aggregator>
                        </Participant>
                        <Sender>
                            <TravelAgency>
                                <AgencyID>${SIA_Config.agencyID}</AgencyID>
                                <IATA_Number>${SIA_Config.iataNumber}</IATA_Number>
                                <Name>${SIA_Config.agencyName}</Name>
                            </TravelAgency>
                        </Sender>
                    </Party>
                    <Request>
                        <OrderFilterCriteria>
                            <Order>
                                <OrderID>${pnr}</OrderID>
                                <OwnerCode>${SIA_Config.airline}</OwnerCode>
                            </Order>
                        </OrderFilterCriteria>
                    </Request>
                </OrderRetrieveRQ>
            </soapenv:Body>
        </soapenv:Envelope>`;
    console.log(reqBody)
    //return reqBody

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/xml");
    myHeaders.append("CHAR", "UTF-8");
    myHeaders.append("SOAPAction", "http://webservices.amadeus.com/NDC_OrderRetrieve_18.1");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: reqBody,
        redirect: 'follow'
    };

    const apiResp = await fetch(SIA_Config.WSAP, requestOptions).then(r => r.text());

    return { rq: reqBody, rs: apiResp }
}

function xml_req_header(_action) {
    var nonce = CryptoJS.enc.Utf8.parse(CryptoJS.lib.WordArray.random(8));
    var nonceEncoded = nonce.toString(CryptoJS.enc.Base64);

    // Generate created timestamp
    var timestamp = (new Date()).toISOString();
    var created = CryptoJS.enc.Utf8.parse(timestamp);

    // Get LSS password from environment variable and hash password
    var passwordHash = CryptoJS.SHA1(SIA_Config.password);

    // Generate password digest
    var passwordDigest = CryptoJS.SHA1(nonce.concat(created).concat(passwordHash)).toString(CryptoJS.enc.Base64);
    return (`
    <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <sec:AMA_SecurityHostedUser>
            <sec:UserID POS_Type="1" RequestorType="U" PseudoCityCode="${SIA_Config.OID}" AgentDutyCode="SU">
                <typ:RequestorID xmlns:typ="http://xml.amadeus.com/2010/06/Types_v1" xmlns:iat="http://www.iata.org/IATA/2007/00/IATA2010.1">
                    <iat:CompanyName>${SIA_Config.airline}</iat:CompanyName>
                </typ:RequestorID>
            </sec:UserID>
        </sec:AMA_SecurityHostedUser>
        <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
            <wsse:UsernameToken>
                <wsse:Username>${SIA_Config.LSSUser}</wsse:Username>
                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">${passwordDigest}</wsse:Password>
                <wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">${nonceEncoded}</wsse:Nonce>
                <wsu:Created>${timestamp}</wsu:Created>
            </wsse:UsernameToken>
        </wsse:Security>
        <wsa:Action>${_action}</wsa:Action>
        <wsa:MessageID>3aa0046c-f5df-4de3-8df7-7818f598f0d8</wsa:MessageID>
        <wsa:To>${SIA_Config.WSAP}</wsa:To>
    </soapenv:Header>
    `);
}
async function header(password) {
    body1: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sec="http://xml.amadeus.com/2010/06/Security_v1" xmlns:link="http://wsdl.amadeus.com/2010/06/ws/Link_v1" xmlns:ses="http://xml.amadeus.com/2010/06/Session_v3" xmlns:ns="http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ">\r\n    <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">\r\n        <sec:AMA_SecurityHostedUser>\r\n            <sec:UserID POS_Type="1" RequestorType="U" PseudoCityCode="NDCSQ08SQ" AgentDutyCode="SU">\r\n                <typ:RequestorID xmlns:typ="http://xml.amadeus.com/2010/06/Types_v1" xmlns:iat="http://www.iata.org/IATA/2007/00/IATA2010.1">\r\n                    <iat:CompanyName>SQ</iat:CompanyName>\r\n                </typ:RequestorID>\r\n            </sec:UserID>\r\n        </sec:AMA_SecurityHostedUser>\r\n        <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n            <wsse:UsernameToken>\r\n                <wsse:Username>WSSQASG</wsse:Username>\r\n                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">' + passwordDigest + '</wsse:Password>\r\n                <wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">' + nonceEncoded + '</wsse:Nonce>\r\n                <wsu:Created>' + timestamp + '</wsu:Created>\r\n            </wsse:UsernameToken>\r\n        </wsse:Security>\r\n        <wsa:Action>http://webservices.amadeus.com/NDC_AirShopping_18.1</wsa:Action>\r\n        <wsa:MessageID>3aa0046c-f5df-4de3-8df7-7818f598f0d8</wsa:MessageID>\r\n        <wsa:To>https://nodeA3.test.webservices.amadeus.com/1ASIWCLTSQ</wsa:To>\r\n    </soapenv:Header>\r\n    <soapenv:Body>\r\n        <AirShoppingRQ xmlns="http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ">\r\n            <PayloadAttributes>\r\n                <Version>18.1</Version>\r\n            </PayloadAttributes>\r\n            <PointOfSale>\r\n                <Country>\r\n                    <CountryCode>AU</CountryCode>\r\n                </Country>\r\n            </PointOfSale>\r\n            <Party>\r\n                <Recipient>\r\n                    <ORA>\r\n                        <AirlineDesigCode>SQ</AirlineDesigCode>\r\n                    </ORA>\r\n                </Recipient>\r\n                <Participant>\r\n                    <Aggregator>\r\n                        <AggregatorID></AggregatorID>\r\n                    </Aggregator>\r\n                </Participant>\r\n                <Sender>\r\n                    <TravelAgency>\r\n                        <AgencyID>02362662</AgencyID>\r\n                        <IATA_Number>02362662</IATA_Number>\r\n                        <Name>Air link Service group</Name>\r\n                    </TravelAgency>\r\n                </Sender>\r\n            </Party>\r\n            <Request>\r\n                <FlightRequest>\r\n                    <OriginDestRequest>\r\n                        <OriginDepRequest>\r\n                            <IATA_LocationCode>BKK</IATA_LocationCode>\r\n                            <Date>2023-10-10</Date>\r\n                        </OriginDepRequest>\r\n                        <DestArrivalRequest>\r\n                            <IATA_LocationCode>SIN</IATA_LocationCode>\r\n                        </DestArrivalRequest>\r\n                    </OriginDestRequest>\r\n                    <!--\r\n                    <OriginDestRequest><OriginDepRequest><IATA_LocationCode>SIN</IATA_LocationCode><Date>2023-11-11</Date></OriginDepRequest><DestArrivalRequest><IATA_LocationCode>BKK</IATA_LocationCode></DestArrivalRequest>\r\n                    </OriginDestRequest>\r\n                    -->\r\n                \r\n        </FlightRequest>\r\n        <Paxs>\r\n            <Pax>\r\n                <PaxID>ADT1</PaxID>\r\n                <PTC>ADT</PTC>\r\n            </Pax>\r\n            <!--\r\n                    <Pax><PaxID>ADT2</PaxID><PTC>ADT</PTC></Pax><Pax><PaxID>CHD1</PaxID><PTC>CHD</PTC></Pax><Pax><PaxID>INF1</PaxID><PTC>INF</PTC></Pax>\r\n                     -->\r\n                \r\n            \r\n</Paxs>\r\n<ShoppingCriteria>\r\n    <CabinTypeCriteria>\r\n        <CabinTypeName>ECO</CabinTypeName>\r\n    </CabinTypeCriteria>\r\n    <!-- * Fare preference -If cabin type is present, fare preference will be ignored -->\r\n    <!-- <FarePreferences><FareCodes><Code><Code></Code></Code></FareCodes></FarePreferences> -->\r\n<!--Fare preference * -->\r\n<!--\r\n        <PricingMethodCriteria><BestPricingOption>CHJ</BestPricingOption></PricingMethodCriteria>\r\n        -->\r\n    \r\n</ShoppingCriteria>\r\n<!-- * Currency Override -->\r\n<!-- <ResponseParameters><PricingParameter><OverrideCurCode>CNY</OverrideCurCode></PricingParameter><LangUsage><LangCode>ZH</LangCode></LangUsage>\r\n        </ResponseParameters> -->\r\n<!-- Currency Override * -->\r\n<!-- * Corporate Code -->\r\n<ProgramCriteria>\r\n    <ProgramAccount>\r\n        <AccountID></AccountID>\r\n    </ProgramAccount>\r\n    <ProgramOwner>\r\n        <Carrier>\r\n            <AirlineDesigCode>SQ</AirlineDesigCode>\r\n        </Carrier>\r\n    </ProgramOwner>\r\n</ProgramCriteria>\r\n<!--Corporate Code * --> \r\n\r\n\r\n\r\n</Request>\r\n</AirShoppingRQ>\r\n</soapenv:Body>\r\n</soapenv:Envelope>`
    var nonce = CryptoJS.enc.Utf8.parse(CryptoJS.lib.WordArray.random(8));
    var nonceEncoded = nonce.toString(CryptoJS.enc.Base64);

    // Generate created timestamp
    var timestamp = (new Date()).toISOString();
    var created = CryptoJS.enc.Utf8.parse(timestamp);

    // Get LSS password from environment variable and hash password
    //var password = "WOLJW3jt";
    var passwordHash = CryptoJS.SHA1(password);

    // Generate password digest
    var passwordDigest = CryptoJS.SHA1(nonce.concat(created).concat(passwordHash)).toString(CryptoJS.enc.Base64);

    //Set Global Variables
    console.log("wsse-Password", passwordDigest);
    console.log("wsse-Nonce", nonceEncoded);
    console.log("wsse-Created", timestamp);


    var options = {
        'method': 'POST',
        'url': 'https://nodeA3.test.webservices.amadeus.com/1ASIWCLTSQ',
        'headers': {
            'SOAPAction': 'http://webservices.amadeus.com/NDC_AirShopping_18.1'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sec="http://xml.amadeus.com/2010/06/Security_v1" xmlns:link="http://wsdl.amadeus.com/2010/06/ws/Link_v1" xmlns:ses="http://xml.amadeus.com/2010/06/Session_v3" xmlns:ns="http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ">\r\n    <soapenv:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">\r\n        <sec:AMA_SecurityHostedUser>\r\n            <sec:UserID POS_Type="1" RequestorType="U" PseudoCityCode="NDCSQ08SQ" AgentDutyCode="SU">\r\n                <typ:RequestorID xmlns:typ="http://xml.amadeus.com/2010/06/Types_v1" xmlns:iat="http://www.iata.org/IATA/2007/00/IATA2010.1">\r\n                    <iat:CompanyName>SQ</iat:CompanyName>\r\n                </typ:RequestorID>\r\n            </sec:UserID>\r\n        </sec:AMA_SecurityHostedUser>\r\n        <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n            <wsse:UsernameToken>\r\n                <wsse:Username>WSSQASG</wsse:Username>\r\n                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">' + passwordDigest + '</wsse:Password>\r\n                <wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">' + nonceEncoded + '</wsse:Nonce>\r\n                <wsu:Created>' + timestamp + '</wsu:Created>\r\n            </wsse:UsernameToken>\r\n        </wsse:Security>\r\n        <wsa:Action>http://webservices.amadeus.com/NDC_AirShopping_18.1</wsa:Action>\r\n        <wsa:MessageID>3aa0046c-f5df-4de3-8df7-7818f598f0d8</wsa:MessageID>\r\n        <wsa:To>https://nodeA3.test.webservices.amadeus.com/1ASIWCLTSQ</wsa:To>\r\n    </soapenv:Header>\r\n    <soapenv:Body>\r\n        <AirShoppingRQ xmlns="http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ">\r\n            <PayloadAttributes>\r\n                <Version>18.1</Version>\r\n            </PayloadAttributes>\r\n            <PointOfSale>\r\n                <Country>\r\n                    <CountryCode>AU</CountryCode>\r\n                </Country>\r\n            </PointOfSale>\r\n            <Party>\r\n                <Recipient>\r\n                    <ORA>\r\n                        <AirlineDesigCode>SQ</AirlineDesigCode>\r\n                    </ORA>\r\n                </Recipient>\r\n                <Participant>\r\n                    <Aggregator>\r\n                        <AggregatorID></AggregatorID>\r\n                    </Aggregator>\r\n                </Participant>\r\n                <Sender>\r\n                    <TravelAgency>\r\n                        <AgencyID>02362662</AgencyID>\r\n                        <IATA_Number>02362662</IATA_Number>\r\n                        <Name>Air link Service group</Name>\r\n                    </TravelAgency>\r\n                </Sender>\r\n            </Party>\r\n            <Request>\r\n                <FlightRequest>\r\n                    <OriginDestRequest>\r\n                        <OriginDepRequest>\r\n                            <IATA_LocationCode>BKK</IATA_LocationCode>\r\n                            <Date>2023-10-10</Date>\r\n                        </OriginDepRequest>\r\n                        <DestArrivalRequest>\r\n                            <IATA_LocationCode>SIN</IATA_LocationCode>\r\n                        </DestArrivalRequest>\r\n                    </OriginDestRequest>\r\n                    <!--\r\n                    <OriginDestRequest><OriginDepRequest><IATA_LocationCode>SIN</IATA_LocationCode><Date>2023-11-11</Date></OriginDepRequest><DestArrivalRequest><IATA_LocationCode>BKK</IATA_LocationCode></DestArrivalRequest>\r\n                    </OriginDestRequest>\r\n                    -->\r\n                \r\n        </FlightRequest>\r\n        <Paxs>\r\n            <Pax>\r\n                <PaxID>ADT1</PaxID>\r\n                <PTC>ADT</PTC>\r\n            </Pax>\r\n            <!--\r\n                    <Pax><PaxID>ADT2</PaxID><PTC>ADT</PTC></Pax><Pax><PaxID>CHD1</PaxID><PTC>CHD</PTC></Pax><Pax><PaxID>INF1</PaxID><PTC>INF</PTC></Pax>\r\n                     -->\r\n                \r\n            \r\n</Paxs>\r\n<ShoppingCriteria>\r\n    <CabinTypeCriteria>\r\n        <CabinTypeName>ECO</CabinTypeName>\r\n    </CabinTypeCriteria>\r\n    <!-- * Fare preference -If cabin type is present, fare preference will be ignored -->\r\n    <!-- <FarePreferences><FareCodes><Code><Code></Code></Code></FareCodes></FarePreferences> -->\r\n<!--Fare preference * -->\r\n<!--\r\n        <PricingMethodCriteria><BestPricingOption>CHJ</BestPricingOption></PricingMethodCriteria>\r\n        -->\r\n    \r\n</ShoppingCriteria>\r\n<!-- * Currency Override -->\r\n<!-- <ResponseParameters><PricingParameter><OverrideCurCode>CNY</OverrideCurCode></PricingParameter><LangUsage><LangCode>ZH</LangCode></LangUsage>\r\n        </ResponseParameters> -->\r\n<!-- Currency Override * -->\r\n<!-- * Corporate Code -->\r\n<ProgramCriteria>\r\n    <ProgramAccount>\r\n        <AccountID></AccountID>\r\n    </ProgramAccount>\r\n    <ProgramOwner>\r\n        <Carrier>\r\n            <AirlineDesigCode>SQ</AirlineDesigCode>\r\n        </Carrier>\r\n    </ProgramOwner>\r\n</ProgramCriteria>\r\n<!--Corporate Code * --> \r\n\r\n\r\n\r\n</Request>\r\n</AirShoppingRQ>\r\n</soapenv:Body>\r\n</soapenv:Envelope>'

    };
    await request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });

}