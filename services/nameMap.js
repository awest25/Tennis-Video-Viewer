/* Usage: If you want to change the name of a column in the filter list, 
   add the original column name to the left side and the display name
   to the right side. */

const nameMap = {
    "Name"                   : 'Point Score',
    "Shot 1: gameScore"      : 'Game Score',
    "Shot 1: setScore"       : 'Set Score',
    "Shot 1: serverName"     : 'Server Name',
    "Shot 1: firstServeIn"   : 'First Serve In',
    "Shot 1: firstServeZone" : 'First Serve Zone',
    "Shot 1: secondServeIn"  : 'Second Serve In',
    "Shot 1: secondServeZone": 'Second Serve Zone',
    "Shot 2: returnData"     : 'Return Data',
  };  

/* Available keys for data format 1
   (each starts with "Shot X: ")
   (except for pointScore and isPointStartTime which are renamed to "Name" and "Position"): */

//   pointScore
//   gameScore
//   setScore
//   isPointStartTime
//   isPointEndTime
//   shotInRally
//   serverName
//   firstServeIn
//   firstServeZone
//   secondServeIn
//   secondServeZone
//   returnData
//   shotType
//   shotSpin
//   isVolley
//   isApproach
//   isDropshot
//   isWinner
//   isErrorWideR
//   isErrorWideL
//   isErrorNet
//   isErrorLong
//   isPointStart
//   isPointEnd
//   player2Name

export default nameMap;