export interface LanguageData{
    sections:{
        global:{
            submitButton:string;
            discardButton:string;
            requiredFieldError:string;
            saveButton:string;
            close: string,
            searchButton:string,
            actionsLabel:string,
            startLable:string,
            stopLabel:string,
            confirmationRequestTitle:string,
            confirmationSystemOffRequestMessage:string,
            transmissionSuccededTitle:string,
            transmissionSuccededMessage:string,
            yesButtonLabel:string,
            noButtonLabel:string,
            enabledButtonLabel:string,
            configureButtonLabel:string,
            rebootNeededMessage:string,
            timeLabel:string,
            dateLabel:string,
            timezoneLabel:string
        },
        footer:{
            threatTitle: string,
            threatDescription: string
        }
        login:{
            pageTitle:string;
            pageDescription:string;
            signInButton:string;
        },
        menu:{
            languageLabel:string;
            italian:string;
            english:string;
            manageProfile:string;
            changeProfile:string;
            changePassword:string;
        },
        threats:{
            pageTitle:string;
            pageDescription:string;
            threatContent:{
                cveData:{
                    technicalDetail: string;
                    entity: string;
                    description: string;
                },
                externalLinks:{
                    externalLinks: string
                }
                intelligenceData:{
                    intelligenceData: string,
                    description: string,
                    threatLevel: string
                },
                mitreElements:{
                    techniqueDetails:{
                        technicalDetail:string,
                        name: string,
                        technique: string,
                        description: string,
                        platform: string,
                    },
                    elMitreMatrix: string,
                    viewMitreMatrix: string
                },
                threatConnections:{
                    connections:string,
                    ipSrcSrcPort: string,
                    protocol: string
                    ipDstDstPort: string
                },
                threatData:{
                    threatDatas: string,
                    identifier: string,
                    severity: string,
                    ruleName: string,
                    ruleType: string,
                    family: string,
                    action: string,
                    threatMessage: string
                },
                threatMap:{
                    localization:string
                },
                close: string,
                threatC:string,
                threatsList: string,
                resultsFilters:string,
                searchParameters: string,
            },
            threatFilters:{
                severity:{
                    severity:string,
                    all:string,
                    critical:string,
                    high:string,
                    medium:string,
                    low:string
                },
                filterAll: string,
                clearAll:string,
                ipSource: string,
                ipDestination: string,
                keyWord: string
            },
            threatSearchParameters:{
                lastHour: string,
                last6Hours: string,
                last12Hours: string,
                last24Hours: string,
                last7Days: string,
                last30Days: string
            },
            threatTable:{
                export:string
            }       
            
        },
        administration:{
            systemControl:{
                pageTitle:string;
                pageDescription:string;
                feelerStatus:{
                    feelerServiceStatusLabel:string,
                    currentStatusLabel:string
                };
                systemReboot:{
                    systemRebootTitle:string;
                    rebootModeTitle:string;
                    rebootButtonLabel:string;
                    softRebootMessage:string;
                    hardRebootMessage:string;
                };
                ntpConfiguration:{
                    configureNTPServerTitle:string;
                    NTPServerLabel:string;
                },
                manualTimeSettings:{
                    manualTimeSettingTitle:string;
                }
            }
        },
        systemControl:{
            currentStatus:{
                currentStatusTitle: string,
                currentStatus:string,
                activateBtn:string,
                shutdownBtn: string,
                suspendedBtn: string
            },			
            systemRestart:{
                systemRestart: string,
                hardRestart: string,
                softRestart: string,
                restartBtn:string
            }
        }
    }
}