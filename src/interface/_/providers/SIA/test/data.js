module.exports = {
     AirShoppingRS : JSON.parse(`{
    "soap:Envelope": {
      "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
      "xmlns:awsse": "http://xml.amadeus.com/2010/06/Session_v3",
      "xmlns:wsa": "http://www.w3.org/2005/08/addressing",
      "soap:Header": {
        "wsa:To": "http://www.w3.org/2005/08/addressing/anonymous",
        "wsa:From": {
          "wsa:Address": "https://nodeA3.test.webservices.amadeus.com/1ASIWCLTSQ"
        },
        "wsa:Action": "http://webservices.amadeus.com/NDC_AirShopping_18.1",
        "wsa:MessageID": "urn:uuid:df39fabf-6a52-8d34-613a-8c43d55142d6",
        "wsa:RelatesTo": {
          "RelationshipType": "http://www.w3.org/2005/08/addressing/reply",
          "$t": "3aa0046c-f5df-4de3-8df7-7818f598f0d8"
        },
        "awsse:Session": {
          "TransactionStatusCode": "End",
          "awsse:SessionId": "01ECF1VMYT",
          "awsse:SequenceNumber": "1",
          "awsse:SecurityToken": "28MYVPXY3CORP19CR6BT0GVY76"
        }
      },
      "soap:Body": {
        "AirShoppingRS": {
          "xmlns": "http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRS",
          "xmlns:ns2": "http://www.iata.org/IATA/2015/00/2018.1/AirShoppingRQ",
          "PayloadAttributes": {
            "Version": "18.1",
            "CorrelationID": "8R2PH6G9B1F50Y1C#LBD#6U5H0"
          },
          "Response": {
            "AirShoppingProcessing": {
              "MarketingMessages": {
                "MarketMessage": {
                  "Associations": {
                    "OfferAssociations": {
                      "Flight": {
                        "FlightSegmentReference": [
                          {
                            "ref": "SEG4",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "P"
                              }
                            }
                          },
                          {
                            "ref": "SEG4",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "T"
                              }
                            }
                          },
                          {
                            "ref": "SEG4",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "E"
                              }
                            }
                          },
                          {
                            "ref": "SEG4",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "H"
                              }
                            }
                          },
                          {
                            "ref": "SEG8",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "P"
                              }
                            }
                          },
                          {
                            "ref": "SEG8",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "T"
                              }
                            }
                          },
                          {
                            "ref": "SEG8",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "E"
                              }
                            }
                          },
                          {
                            "ref": "SEG8",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "H"
                              }
                            }
                          },
                          {
                            "ref": "SEG6",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "P"
                              }
                            }
                          },
                          {
                            "ref": "SEG6",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "T"
                              }
                            }
                          },
                          {
                            "ref": "SEG6",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "E"
                              }
                            }
                          },
                          {
                            "ref": "SEG6",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "H"
                              }
                            }
                          },
                          {
                            "ref": "SEG3",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "P"
                              }
                            }
                          },
                          {
                            "ref": "SEG3",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "T"
                              }
                            }
                          },
                          {
                            "ref": "SEG3",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "E"
                              }
                            }
                          },
                          {
                            "ref": "SEG3",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "H"
                              }
                            }
                          },
                          {
                            "ref": "SEG2",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "P"
                              }
                            }
                          },
                          {
                            "ref": "SEG2",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "T"
                              }
                            }
                          },
                          {
                            "ref": "SEG2",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "E"
                              }
                            }
                          },
                          {
                            "ref": "SEG2",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "H"
                              }
                            }
                          },
                          {
                            "ref": "SEG5",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "B"
                              }
                            }
                          },
                          {
                            "ref": "SEG5",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "E"
                              }
                            }
                          },
                          {
                            "ref": "SEG5",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "H"
                              }
                            }
                          },
                          {
                            "ref": "SEG5",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "M"
                              }
                            }
                          },
                          {
                            "ref": "SEG7",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "E"
                              }
                            }
                          },
                          {
                            "ref": "SEG7",
                            "ClassOfService": {
                              "Code": {
                                "SeatsLeft": "9",
                                "$t": "H"
                              }
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "DataLists": {
              "BaggageAllowanceList": {
                "BaggageAllowance": [
                  {
                    "BaggageAllowanceID": "FBA1",
                    "TypeCode": "CheckedBag",
                    "WeightAllowance": {
                      "MaximumWeightMeasure": {
                        "UnitCode": "KILOGRAM",
                        "$t": "30"
                      }
                    }
                  },
                  {
                    "BaggageAllowanceID": "FBA2",
                    "TypeCode": "CheckedBag",
                    "WeightAllowance": {
                      "MaximumWeightMeasure": {
                        "UnitCode": "KILOGRAM",
                        "$t": "35"
                      }
                    }
                  }
                ]
              },
              "OriginDestList": {
                "OriginDest": {
                  "OriginDestID": "MELDEL",
                  "OriginCode": "MEL",
                  "DestCode": "DEL",
                  "PaxJourneyRefID": [
                    "FLT5",
                    "FLT4",
                    "FLT2",
                    "FLT6",
                    "FLT3",
                    "FLT1"
                  ]
                }
              },
              "PaxJourneyList": {
                "PaxJourney": [
                  {
                    "PaxJourneyID": "FLT5",
                    "Duration": "P1DT1H5M",
                    "PaxSegmentRefID": [
                      "SEG7",
                      "SEG3"
                    ]
                  },
                  {
                    "PaxJourneyID": "FLT4",
                    "Duration": "P1DT0H35M",
                    "PaxSegmentRefID": [
                      "SEG2",
                      "SEG5"
                    ]
                  },
                  {
                    "PaxJourneyID": "FLT2",
                    "Duration": "PT15H45M",
                    "PaxSegmentRefID": [
                      "SEG4",
                      "SEG5"
                    ]
                  },
                  {
                    "PaxJourneyID": "FLT6",
                    "Duration": "P1DT6H15M",
                    "PaxSegmentRefID": [
                      "SEG4",
                      "SEG8"
                    ]
                  },
                  {
                    "PaxJourneyID": "FLT3",
                    "Duration": "PT18H30M",
                    "PaxSegmentRefID": [
                      "SEG6",
                      "SEG5"
                    ]
                  },
                  {
                    "PaxJourneyID": "FLT1",
                    "Duration": "PT15H5M",
                    "PaxSegmentRefID": [
                      "SEG2",
                      "SEG3"
                    ]
                  }
                ]
              },
              "PaxList": {
                "Pax": [
                  {
                    "PaxID": "PAX2",
                    "PTC": "ADT"
                  },
                  {
                    "PaxID": "PAX1",
                    "PTC": "ADT"
                  },
                  {
                    "PaxID": "PAX3",
                    "PTC": "CHD"
                  }
                ]
              },
              "PaxSegmentList": {
                "PaxSegment": [
                  {
                    "PaxSegmentID": "SEG4",
                    "Duration": "PT7H50M",
                    "Dep": {
                      "IATA_LocationCode": "MEL",
                      "TerminalName": "2",
                      "AircraftScheduledDateTime": "2023-10-10T19:25:00"
                    },
                    "Arrival": {
                      "IATA_LocationCode": "SIN",
                      "TerminalName": "0",
                      "AircraftScheduledDateTime": "2023-10-11T00:15:00"
                    },
                    "MarketingCarrierInfo": {
                      "CarrierDesigCode": "SQ",
                      "MarketingCarrierFlightNumberText": "208"
                    },
                    "OperatingCarrierInfo": {
                      "CarrierDesigCode": "SQ"
                    },
                    "DatedOperatingLeg": {
                      "DatedOperatingLegID": "LEG1",
                      "Dep": {
                        "IATA_LocationCode": "MEL",
                        "TerminalName": "2",
                        "AircraftScheduledDateTime": "2023-10-10T19:25:00"
                      },
                      "Arrival": {
                        "IATA_LocationCode": "SIN",
                        "TerminalName": "0",
                        "AircraftScheduledDateTime": "2023-10-11T00:15:00"
                      },
                      "IATA_AircraftType": {
                        "IATA_AircraftTypeCode": "77W"
                      }
                    }
                  },
                  {
                    "PaxSegmentID": "SEG8",
                    "Duration": "PT5H50M",
                    "Dep": {
                      "IATA_LocationCode": "SIN",
                      "TerminalName": "3",
                      "AircraftScheduledDateTime": "2023-10-11T16:50:00"
                    },
                    "Arrival": {
                      "IATA_LocationCode": "DEL",
                      "TerminalName": "3",
                      "AircraftScheduledDateTime": "2023-10-11T20:10:00"
                    },
                    "MarketingCarrierInfo": {
                      "CarrierDesigCode": "SQ",
                      "MarketingCarrierFlightNumberText": "406"
                    },
                    "OperatingCarrierInfo": {
                      "CarrierDesigCode": "SQ"
                    },
                    "DatedOperatingLeg": {
                      "DatedOperatingLegID": "LEG2",
                      "Dep": {
                        "IATA_LocationCode": "SIN",
                        "TerminalName": "3",
                        "AircraftScheduledDateTime": "2023-10-11T16:50:00"
                      },
                      "Arrival": {
                        "IATA_LocationCode": "DEL",
                        "TerminalName": "3",
                        "AircraftScheduledDateTime": "2023-10-11T20:10:00"
                      },
                      "IATA_AircraftType": {
                        "IATA_AircraftTypeCode": "388"
                      }
                    }
                  },
                  {
                    "PaxSegmentID": "SEG6",
                    "Duration": "PT7H50M",
                    "Dep": {
                      "IATA_LocationCode": "MEL",
                      "TerminalName": "2",
                      "AircraftScheduledDateTime": "2023-10-10T16:40:00"
                    },
                    "Arrival": {
                      "IATA_LocationCode": "SIN",
                      "TerminalName": "0",
                      "AircraftScheduledDateTime": "2023-10-10T21:30:00"
                    },
                    "MarketingCarrierInfo": {
                      "CarrierDesigCode": "SQ",
                      "MarketingCarrierFlightNumberText": "228"
                    },
                    "OperatingCarrierInfo": {
                      "CarrierDesigCode": "SQ"
                    },
                    "DatedOperatingLeg": {
                      "DatedOperatingLegID": "LEG3",
                      "Dep": {
                        "IATA_LocationCode": "MEL",
                        "TerminalName": "2",
                        "AircraftScheduledDateTime": "2023-10-10T16:40:00"
                      },
                      "Arrival": {
                        "IATA_LocationCode": "SIN",
                        "TerminalName": "0",
                        "AircraftScheduledDateTime": "2023-10-10T21:30:00"
                      },
                      "IATA_AircraftType": {
                        "IATA_AircraftTypeCode": "388"
                      }
                    }
                  },
                  {
                    "PaxSegmentID": "SEG3",
                    "Duration": "PT5H50M",
                    "Dep": {
                      "IATA_LocationCode": "SIN",
                      "TerminalName": "3",
                      "AircraftScheduledDateTime": "2023-10-10T16:50:00"
                    },
                    "Arrival": {
                      "IATA_LocationCode": "DEL",
                      "TerminalName": "3",
                      "AircraftScheduledDateTime": "2023-10-10T20:10:00"
                    },
                    "MarketingCarrierInfo": {
                      "CarrierDesigCode": "SQ",
                      "MarketingCarrierFlightNumberText": "406"
                    },
                    "OperatingCarrierInfo": {
                      "CarrierDesigCode": "SQ"
                    },
                    "DatedOperatingLeg": {
                      "DatedOperatingLegID": "LEG4",
                      "Dep": {
                        "IATA_LocationCode": "SIN",
                        "TerminalName": "3",
                        "AircraftScheduledDateTime": "2023-10-10T16:50:00"
                      },
                      "Arrival": {
                        "IATA_LocationCode": "DEL",
                        "TerminalName": "3",
                        "AircraftScheduledDateTime": "2023-10-10T20:10:00"
                      },
                      "IATA_AircraftType": {
                        "IATA_AircraftTypeCode": "388"
                      }
                    }
                  },
                  {
                    "PaxSegmentID": "SEG2",
                    "Duration": "PT7H50M",
                    "Dep": {
                      "IATA_LocationCode": "MEL",
                      "TerminalName": "2",
                      "AircraftScheduledDateTime": "2023-10-10T10:35:00"
                    },
                    "Arrival": {
                      "IATA_LocationCode": "SIN",
                      "TerminalName": "0",
                      "AircraftScheduledDateTime": "2023-10-10T15:25:00"
                    },
                    "MarketingCarrierInfo": {
                      "CarrierDesigCode": "SQ",
                      "MarketingCarrierFlightNumberText": "238"
                    },
                    "OperatingCarrierInfo": {
                      "CarrierDesigCode": "SQ"
                    },
                    "DatedOperatingLeg": {
                      "DatedOperatingLegID": "LEG5",
                      "Dep": {
                        "IATA_LocationCode": "MEL",
                        "TerminalName": "2",
                        "AircraftScheduledDateTime": "2023-10-10T10:35:00"
                      },
                      "Arrival": {
                        "IATA_LocationCode": "SIN",
                        "TerminalName": "0",
                        "AircraftScheduledDateTime": "2023-10-10T15:25:00"
                      },
                      "IATA_AircraftType": {
                        "IATA_AircraftTypeCode": "359"
                      }
                    }
                  },
                  {
                    "PaxSegmentID": "SEG5",
                    "Duration": "PT5H35M",
                    "Dep": {
                      "IATA_LocationCode": "SIN",
                      "TerminalName": "3",
                      "AircraftScheduledDateTime": "2023-10-11T02:35:00"
                    },
                    "Arrival": {
                      "IATA_LocationCode": "DEL",
                      "TerminalName": "3",
                      "AircraftScheduledDateTime": "2023-10-11T05:40:00"
                    },
                    "MarketingCarrierInfo": {
                      "CarrierDesigCode": "SQ",
                      "MarketingCarrierFlightNumberText": "402"
                    },
                    "OperatingCarrierInfo": {
                      "CarrierDesigCode": "SQ"
                    },
                    "DatedOperatingLeg": {
                      "DatedOperatingLegID": "LEG6",
                      "Dep": {
                        "IATA_LocationCode": "SIN",
                        "TerminalName": "3",
                        "AircraftScheduledDateTime": "2023-10-11T02:35:00"
                      },
                      "Arrival": {
                        "IATA_LocationCode": "DEL",
                        "TerminalName": "3",
                        "AircraftScheduledDateTime": "2023-10-11T05:40:00"
                      },
                      "IATA_AircraftType": {
                        "IATA_AircraftTypeCode": "787"
                      }
                    }
                  },
                  {
                    "PaxSegmentID": "SEG7",
                    "Duration": "PT7H55M",
                    "Dep": {
                      "IATA_LocationCode": "MEL",
                      "TerminalName": "2",
                      "AircraftScheduledDateTime": "2023-10-10T00:35:00"
                    },
                    "Arrival": {
                      "IATA_LocationCode": "SIN",
                      "TerminalName": "0",
                      "AircraftScheduledDateTime": "2023-10-10T05:30:00"
                    },
                    "MarketingCarrierInfo": {
                      "CarrierDesigCode": "SQ",
                      "MarketingCarrierFlightNumberText": "218"
                    },
                    "OperatingCarrierInfo": {
                      "CarrierDesigCode": "SQ"
                    },
                    "DatedOperatingLeg": {
                      "DatedOperatingLegID": "LEG7",
                      "Dep": {
                        "IATA_LocationCode": "MEL",
                        "TerminalName": "2",
                        "AircraftScheduledDateTime": "2023-10-10T00:35:00"
                      },
                      "Arrival": {
                        "IATA_LocationCode": "SIN",
                        "TerminalName": "0",
                        "AircraftScheduledDateTime": "2023-10-10T05:30:00"
                      },
                      "IATA_AircraftType": {
                        "IATA_AircraftTypeCode": "359"
                      }
                    }
                  }
                ]
              },
              "PenaltyList": {
                "Penalty": [
                  {
                    "PenaltyID": "PEN1",
                    "PenaltyAmount": "70.00",
                    "DescText": "Change permitted",
                    "AppCode": "BDC",
                    "ChangeFeeInd": "true"
                  },
                  {
                    "PenaltyID": "PEN2",
                    "PenaltyAmount": "70.00",
                    "DescText": "Reissue permitted",
                    "AppCode": "BDT",
                    "ChangeFeeInd": "true"
                  },
                  {
                    "PenaltyID": "PEN3",
                    "PenaltyAmount": "260.00",
                    "DescText": "Cancel permitted",
                    "AppCode": "BDT",
                    "CancelFeeInd": "true"
                  },
                  {
                    "PenaltyID": "PEN4",
                    "PenaltyAmount": "0.00",
                    "DescText": "Change permitted",
                    "AppCode": "BDC",
                    "ChangeFeeInd": "true"
                  },
                  {
                    "PenaltyID": "PEN5",
                    "PenaltyAmount": "0.00",
                    "DescText": "Reissue permitted",
                    "AppCode": "BDT",
                    "ChangeFeeInd": "true"
                  },
                  {
                    "PenaltyID": "PEN6",
                    "PenaltyAmount": "130.00",
                    "DescText": "Cancel permitted",
                    "AppCode": "BDT",
                    "CancelFeeInd": "true"
                  }
                ]
              },
              "PriceClassList": {
                "PriceClass": [
                  {
                    "PriceClassID": "FF21",
                    "Name": "Economy Flexi",
                    "Desc": [
                      {
                        "DescID": "CANCEL_BEFOREDEPARTURE",
                        "DescText": "USD 50-100"
                      },
                      {
                        "DescID": "CANCEL_NOSHOWFIRST",
                        "DescText": "USD 100"
                      },
                      {
                        "DescID": "CHANGE_BEFOREDEPARTURE",
                        "DescText": "Complimentary"
                      },
                      {
                        "DescID": "AWARD_UPGRADE",
                        "DescText": "Allowed"
                      },
                      {
                        "DescID": "AWARD_ACCRUAL",
                        "DescText": "100%"
                      },
                      {
                        "DescID": "BAGGAGEALLOWANCE_CARRYON",
                        "DescText": "1 piece Up to 7kg each. Sum of length, width and height of each piece should not exceed 115cm. Carry-on baggage allowance will differ for flights to and from the USA."
                      },
                      {
                        "DescID": "SEATSELECTION",
                        "DescText": "Complimentary (Forward Zone and Standard Seats)"
                      }
                    ]
                  },
                  {
                    "PriceClassID": "FF01",
                    "Name": "Premium Economy Flexi",
                    "Desc": [
                      {
                        "DescID": "CANCEL_BEFOREDEPARTURE",
                        "DescText": "USD 50-100"
                      },
                      {
                        "DescID": "CANCEL_NOSHOWFIRST",
                        "DescText": "USD 200"
                      },
                      {
                        "DescID": "CHANGE_BEFOREDEPARTURE",
                        "DescText": "Complimentary"
                      },
                      {
                        "DescID": "AWARD_UPGRADE",
                        "DescText": "Allowed"
                      },
                      {
                        "DescID": "AWARD_ACCRUAL",
                        "DescText": "125%"
                      },
                      {
                        "DescID": "BAGGAGEALLOWANCE_CARRYON",
                        "DescText": "1 piece Up to 7kg each. Sum of length, width and height of each piece should not exceed 115cm. Carry-on baggage allowance will differ for flights to and from the USA."
                      },
                      {
                        "DescID": "SEATSELECTION",
                        "DescText": "Complimentary ( Except for Extra Legroom Seats)"
                      }
                    ]
                  },
                  {
                    "PriceClassID": "FF31",
                    "Name": "Economy Standard",
                    "Desc": [
                      {
                        "DescID": "CANCEL_BEFOREDEPARTURE",
                        "DescText": "USD 100-200"
                      },
                      {
                        "DescID": "CANCEL_NOSHOWFIRST",
                        "DescText": "USD 100"
                      },
                      {
                        "DescID": "CHANGE_BEFOREDEPARTURE",
                        "DescText": "USD 20-50"
                      },
                      {
                        "DescID": "AWARD_UPGRADE",
                        "DescText": "Allowed"
                      },
                      {
                        "DescID": "AWARD_ACCRUAL",
                        "DescText": "75%"
                      },
                      {
                        "DescID": "BAGGAGEALLOWANCE_CARRYON",
                        "DescText": "1 piece Up to 7kg each. Sum of length, width and height of each piece should not exceed 115cm. Carry-on baggage allowance will differ for flights to and from the USA."
                      },
                      {
                        "DescID": "SEATSELECTION",
                        "DescText": "Complimentary (Standard Seats)"
                      }
                    ]
                  },
                  {
                    "PriceClassID": "FF11",
                    "Name": "Premium Economy Standard",
                    "Desc": [
                      {
                        "DescID": "CANCEL_BEFOREDEPARTURE",
                        "DescText": "USD 150-200"
                      },
                      {
                        "DescID": "CANCEL_NOSHOWFIRST",
                        "DescText": "USD 200"
                      },
                      {
                        "DescID": "CHANGE_BEFOREDEPARTURE",
                        "DescText": "USD 50"
                      },
                      {
                        "DescID": "AWARD_UPGRADE",
                        "DescText": "Allowed"
                      },
                      {
                        "DescID": "AWARD_ACCRUAL",
                        "DescText": "100%"
                      },
                      {
                        "DescID": "BAGGAGEALLOWANCE_CARRYON",
                        "DescText": "1 piece Up to 7kg each. Sum of length, width and height of each piece should not exceed 115cm. Carry-on baggage allowance will differ for flights to and from the USA."
                      },
                      {
                        "DescID": "SEATSELECTION",
                        "DescText": "Complimentary ( Except for Extra Legroom Seats)"
                      }
                    ]
                  }
                ]
              }
            },
            "OffersGroup": {
              "CarrierOffers": {
                "Offer": [
                  {
                    "OfferID": "SP1F-8347572588993579412-1",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT1",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF31",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT1"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-1-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "911.24"
                              }
                            },
                            "BaseAmount": "810.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "649.24"
                              }
                            },
                            "BaseAmount": "608.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT1"
                        }
                      },
                      "Price": {
                        "TotalAmount": "2471.72",
                        "BaseAmount": "2228.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-2",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT2",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF31",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT2"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-2-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "911.24"
                              }
                            },
                            "BaseAmount": "810.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "649.24"
                              }
                            },
                            "BaseAmount": "608.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT2"
                        }
                      },
                      "Price": {
                        "TotalAmount": "2471.72",
                        "BaseAmount": "2228.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-3",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT3",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF31",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT3"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-3-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "911.24"
                              }
                            },
                            "BaseAmount": "810.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "649.24"
                              }
                            },
                            "BaseAmount": "608.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT3"
                        }
                      },
                      "Price": {
                        "TotalAmount": "2471.72",
                        "BaseAmount": "2228.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-4",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT4",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF31",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT4"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-4-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "911.24"
                              }
                            },
                            "BaseAmount": "810.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "649.24"
                              }
                            },
                            "BaseAmount": "608.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT4"
                        }
                      },
                      "Price": {
                        "TotalAmount": "2471.72",
                        "BaseAmount": "2228.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-5",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT5",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF31",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT5"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-5-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "911.24"
                              }
                            },
                            "BaseAmount": "810.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG7"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "649.24"
                              }
                            },
                            "BaseAmount": "608.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG7"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT5"
                        }
                      },
                      "Price": {
                        "TotalAmount": "2471.72",
                        "BaseAmount": "2228.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-6",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT6",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF31",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT6"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-6-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "911.24"
                              }
                            },
                            "BaseAmount": "810.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "649.24"
                              }
                            },
                            "BaseAmount": "608.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "H14AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "H",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF31",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT6"
                        }
                      },
                      "Price": {
                        "TotalAmount": "2471.72",
                        "BaseAmount": "2228.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-7",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT1",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF21",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT1"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-7-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1301.24"
                              }
                            },
                            "BaseAmount": "1200.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "941.24"
                              }
                            },
                            "BaseAmount": "900.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT1"
                        }
                      },
                      "Price": {
                        "TotalAmount": "3543.72",
                        "BaseAmount": "3300.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-8",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT2",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF21",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT2"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-8-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1301.24"
                              }
                            },
                            "BaseAmount": "1200.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "941.24"
                              }
                            },
                            "BaseAmount": "900.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT2"
                        }
                      },
                      "Price": {
                        "TotalAmount": "3543.72",
                        "BaseAmount": "3300.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-9",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT3",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF21",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT3"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-9-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1301.24"
                              }
                            },
                            "BaseAmount": "1200.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "941.24"
                              }
                            },
                            "BaseAmount": "900.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT3"
                        }
                      },
                      "Price": {
                        "TotalAmount": "3543.72",
                        "BaseAmount": "3300.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-10",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT4",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF21",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT4"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-10-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1301.24"
                              }
                            },
                            "BaseAmount": "1200.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "941.24"
                              }
                            },
                            "BaseAmount": "900.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT4"
                        }
                      },
                      "Price": {
                        "TotalAmount": "3543.72",
                        "BaseAmount": "3300.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-11",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT5",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF21",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT5"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-11-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1301.24"
                              }
                            },
                            "BaseAmount": "1200.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG7"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "941.24"
                              }
                            },
                            "BaseAmount": "900.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG7"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT5"
                        }
                      },
                      "Price": {
                        "TotalAmount": "3543.72",
                        "BaseAmount": "3300.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-12",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT6",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA1"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF21",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT6"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-12-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1301.24"
                              }
                            },
                            "BaseAmount": "1200.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "941.24"
                              }
                            },
                            "BaseAmount": "900.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "E12AUOJ"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "E",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF21",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT6"
                        }
                      },
                      "Price": {
                        "TotalAmount": "3543.72",
                        "BaseAmount": "3300.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-13",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT1",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF11",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT1"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-13-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1967.24"
                              }
                            },
                            "BaseAmount": "1866.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1441.24"
                              }
                            },
                            "BaseAmount": "1400.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT1"
                        }
                      },
                      "Price": {
                        "TotalAmount": "5375.72",
                        "BaseAmount": "5132.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-14",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT6",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF11",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT6"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-14-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1967.24"
                              }
                            },
                            "BaseAmount": "1866.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1441.24"
                              }
                            },
                            "BaseAmount": "1400.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT6"
                        }
                      },
                      "Price": {
                        "TotalAmount": "5375.72",
                        "BaseAmount": "5132.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-15",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT2",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF11",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT2"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-15-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1967.24"
                              }
                            },
                            "BaseAmount": "1866.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "M",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1441.24"
                              }
                            },
                            "BaseAmount": "1400.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "M",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT2"
                        }
                      },
                      "Price": {
                        "TotalAmount": "5375.72",
                        "BaseAmount": "5132.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-16",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT3",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF11",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT3"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-16-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1967.24"
                              }
                            },
                            "BaseAmount": "1866.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "M",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1441.24"
                              }
                            },
                            "BaseAmount": "1400.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "M",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT3"
                        }
                      },
                      "Price": {
                        "TotalAmount": "5375.72",
                        "BaseAmount": "5132.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-17",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT4",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN1",
                      "PEN2",
                      "PEN3"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF11",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT4"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-17-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1967.24"
                              }
                            },
                            "BaseAmount": "1866.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "M",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1441.24"
                              }
                            },
                            "BaseAmount": "1400.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "P",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "P14AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "M",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF11",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT4"
                        }
                      },
                      "Price": {
                        "TotalAmount": "5375.72",
                        "BaseAmount": "5132.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-18",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT1",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF01",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT1"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-18-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "2331.24"
                              }
                            },
                            "BaseAmount": "2230.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1714.24"
                              }
                            },
                            "BaseAmount": "1673.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG3"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT1"
                        }
                      },
                      "Price": {
                        "TotalAmount": "6376.72",
                        "BaseAmount": "6133.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-19",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT6",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF01",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT6"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-19-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "2331.24"
                              }
                            },
                            "BaseAmount": "2230.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1714.24"
                              }
                            },
                            "BaseAmount": "1673.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG8"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT6"
                        }
                      },
                      "Price": {
                        "TotalAmount": "6376.72",
                        "BaseAmount": "6133.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-20",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT2",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF01",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT2"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-20-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "2331.24"
                              }
                            },
                            "BaseAmount": "2230.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "B",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1714.24"
                              }
                            },
                            "BaseAmount": "1673.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG4"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "B",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT2"
                        }
                      },
                      "Price": {
                        "TotalAmount": "6376.72",
                        "BaseAmount": "6133.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-21",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT3",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF01",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT3"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-21-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "2331.24"
                              }
                            },
                            "BaseAmount": "2230.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "B",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1714.24"
                              }
                            },
                            "BaseAmount": "1673.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG6"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "B",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT3"
                        }
                      },
                      "Price": {
                        "TotalAmount": "6376.72",
                        "BaseAmount": "6133.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  },
                  {
                    "OfferID": "SP1F-8347572588993579412-22",
                    "OwnerCode": "SQ",
                    "OfferExpirationDateTime": "2023-08-22T23:58:59Z",
                    "BaggageAllowance": {
                      "PaxJourneyRefID": "FLT4",
                      "PaxRefID": [
                        "PAX2",
                        "PAX1",
                        "PAX3"
                      ],
                      "BaggageAllowanceRefID": "FBA2"
                    },
                    "PenaltyRefID": [
                      "PEN4",
                      "PEN5",
                      "PEN6"
                    ],
                    "JourneyOverview": {
                      "PriceClassRefID": "FF01",
                      "JourneyPriceClass": {
                        "PaxJourneyRefID": "FLT4"
                      }
                    },
                    "OfferItem": {
                      "OfferItemID": "SP1F-8347572588993579412-22-1",
                      "MandatoryInd": "true",
                      "FareDetail": [
                        {
                          "PassengerRefs": "PAX1 PAX2",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "2331.24"
                              }
                            },
                            "BaseAmount": "2230.00",
                            "Taxes": {
                              "Total": "101.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "B",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        },
                        {
                          "PassengerRefs": "PAX3",
                          "Price": {
                            "TotalAmount": {
                              "DetailCurrencyPrice": {
                                "Total": "1714.24"
                              }
                            },
                            "BaseAmount": "1673.00",
                            "Taxes": {
                              "Total": "41.24"
                            }
                          },
                          "FareComponent": [
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "T",
                                "CabinType": {
                                  "CabinTypeCode": "W",
                                  "CabinTypeName": "ECOPREMIUM"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG2"
                            },
                            {
                              "FareBasis": {
                                "FareBasisCode": {
                                  "Code": "T12AUO"
                                },
                                "FareRulesRemarks": {
                                  "FareRulesRemark": {
                                    "Category": "FT",
                                    "Text": "NEGOTIATED FARE"
                                  }
                                },
                                "RBD": "B",
                                "CabinType": {
                                  "CabinTypeCode": "M",
                                  "CabinTypeName": "ECO"
                                }
                              },
                              "PriceClassRef": "FF01",
                              "SegmentRefs": "SEG5"
                            }
                          ]
                        }
                      ],
                      "Service": {
                        "ServiceID": "1",
                        "PaxRefID": [
                          "PAX2",
                          "PAX1",
                          "PAX3"
                        ],
                        "ServiceAssociations": {
                          "PaxJourneyRefID": "FLT4"
                        }
                      },
                      "Price": {
                        "TotalAmount": "6376.72",
                        "BaseAmount": "6133.00",
                        "TaxSummary": {
                          "TotalTaxAmount": "243.72"
                        }
                      }
                    }
                  }
                ],
                "CarrierOffersSummary": {
                  "MatchedOfferQty": "22"
                }
              }
            },
            "Metadata": {
              "Other": {
                "OtherMetadata": [
                  {
                    "CurrencyMetadatas": {
                      "CurrencyMetadata": {
                        "MetadataKey": "CURAUD",
                        "Name": "AUD"
                      }
                    }
                  },
                  {
                    "DescriptionMetadatas": {
                      "DescriptionMetadata": {
                        "MetadataKey": "DISCLAIMER",
                        "Topic": "More details on fare conditions will be provided upon selecting your desired flight(s). Fees are subjected to currency conversion and your bank's exchange rate.",
                        "Sequence": "1"
                      }
                    }
                  }
                ]
              }
            },
            "ShoppingResponse": {
              "ShoppingResponseID": "SP1F-8347572588993579412"
            },
            "Warning": {
              "Code": "40003",
              "DescText": "Missing Free baggage Details"
            }
          }
        }
      }
    }
  }`)
}