var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
var request = require('request');

/* GET users listing. */
router.get('/', async function (req, res, next) {

	// Generate nonce
	var nonce = CryptoJS.enc.Utf8.parse(CryptoJS.lib.WordArray.random(8));
	var nonceEncoded = nonce.toString(CryptoJS.enc.Base64);

	// Generate created timestamp
	var timestamp = (new Date()).toISOString();
	var created = CryptoJS.enc.Utf8.parse(timestamp);

	// Get LSS password from environment variable and hash password
	var password = "WOLJW3jt";
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
	request(options, function (error, response) {
		if (error) throw new Error(error);
		console.log(response.body);
	});
	
	res.send('<h1>respond with a resource</h1>');
});

module.exports = router;
