import { GET_ALL_BREED,GET_DETAIL, GET_TEMPERAMENT, SEARCH_FOR_NAME,ORDER_FOR_NAME_AZ, ORDER_FOR_NAME_ZA,FILTER_CREATE, 
    ORDER_BY_TEMPERAMENT, ORDER_BY_PESO_MIN, ORDER_BY_PESO_MAX, POST_BREED } from "./actions";


    const inicialState = {
        breed: [],
        breedAll: [],
        breedDetail: [],
        temperaments: [],
    };

    const rootReducer = (state = inicialState, action) => {

    switch (action.type) {
        case GET_ALL_BREED:
            return {
              ...state,
                breed: action.payload,
                breedAll: action.payload
            };
            
        case GET_TEMPERAMENT:
            return {
              ...state,
                temperaments: action.payload
            };
        case GET_DETAIL:
            return {
             ...state,
                breedDetail: action.payload
            };
        case SEARCH_FOR_NAME:
            return {
            ...state,
                breed: action.payload
            };
            case POST_BREED:
                return{
                    ...state,
                 breedAll:[...action.payload]


                };
            case ORDER_FOR_NAME_AZ:
                let resultAZ = state.breed.sort(function(a, b){
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                return {
                    ...state,
                    breed: resultAZ
                }
            case ORDER_FOR_NAME_ZA:
                let resultZA = state.breed.sort(function(a, b){
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
                return {
                    ...state,
                    breed: resultZA
                };

    
                case FILTER_CREATE:
                    const createdFilter = action.payload === 'Creadas'? state.breed.filter(el => el.createdInDb) : state.breed.filter(el=>!el.createdInDb)
            
                    return {
                        ...state,
                        breed: createdFilter
                    };
                    
                case ORDER_BY_TEMPERAMENT: 
                    const filterTemp = state.breedAll.filter(dog => {
                        if (!dog.temperament) return undefined;
                        return dog.temperament.includes(action.payload)
                    })
                    console.log(filterTemp);
                    return {
                        ...state,
                        breed: filterTemp
                    }
                    case ORDER_BY_PESO_MIN:
                    
                    let resultsMin = state.breed.sort((a,b) => parseInt(a.weight.split(" - ")[0]) - parseInt(b.weight.split(" - ")[0]))
                    let resultmin1 = resultsMin.sort((a,b)=> {
                        if (parseInt(a.weight.split(" - ")[0]) === parseInt(b.weight.split(" - ")[0])) {
                            return parseInt(a.weight.split(" - ")[1]) - parseInt(b.weight.split(" - ")[1])
                        } else return 0;
                    } )
        
                        return {
                            ...state,
                            breed: resultmin1 
                        }
                    case ORDER_BY_PESO_MAX:
                        let resultsMax = state.breed.sort((a,b) => parseInt(b.weight.split(" - ")[0]) - parseInt(a.weight.split(" - ")[0]))
                        let resultMax1 = resultsMax.sort((a,b)=> {
                        if (parseInt(b.weight.split(" - ")[0]) === parseInt(a.weight.split(" - ")[0])) {
                            return parseInt(b.weight.split(" - ")[1]) - parseInt(a.weight.split(" - ")[1])
                        } else return 0;
                    } )
                        
                        console.log(resultsMax)
                        return {
                            ...state,
                            breed: resultMax1
                        };
                    default: 
                    return {...state}
            }
        }
        
        export default rootReducer;