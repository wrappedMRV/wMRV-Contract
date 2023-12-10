const proJectIds  = [
    "VCS-766", "VCS-173", "VCS-173", "VCS-1464", "VCS-1146", 
    "VCS-173", "VCS-1037", "VCS-1464", "VCS-292", "VCS-762", 
    "VCS-762", "VCS-1121", "VCS-766", "VCS-1188", "VCS-917", 
    "VCS-786", "VCS-2098", "VCS-535", "VCS-535", "VCS-535", 
    "VCS-1121", "VCS-917", "VCS-810", "VCS-173", "VCS-762", 
    "VCS-535", "VCS-1121", "VCS-264", "VCS-836", "VCS-836", 
    "VCS-1529", "VCS-836", "VCS-836", "VCS-173", "VCS-836", 
    "VCS-2095", "VCS-1188", "VCS-836", "VCS-2026", "VCS-1742", 
    "VCS-426", "VCS-728", "VCS-762", "VCS-903", "VCS-426", 
    "VCS-903", "VCS-499", "VCS-836", "VCS-499", "VCS-870", 
    "VCS-499", "VCS-1188", "VCS-870", "VCS-499", "VCS-426", 
    "VCS-92", "VCS-1656", "VCS-786", "VCS-728", "VCS-1762", 
    "VCS-1529", "VCS-1792", "VCS-1542", "VCS-1577", "VCS-487", 
    "VCS-487", "VCS-1549", "VCS-1883", "VCS-985", "VCS-191", 
    "VCS-191", "VCS-1002", "VCS-513", "VCS-191", "VCS-896", 
    "VCS-191", "VCS-494", "VCS-513", "VCS-494", "VCS-10", 
    "VCS-513", "VCS-896", "VCS-929", "VCS-837", "VCS-1166", 
    "VCS-929", "VCS-722", "VCS-929", "VCS-10", "VCS-653", 
    "VCS-1002", "VCS-1094", "VCS-875", "VCS-875", "VCS-1100", 
    "VCS-68", "VCS-68", "VCS-1100", "VCS-1291", "VCS-68", 
    "VCS-2098", "VCS-1205", "VCS-982", "VCS-192", "VCS-192", 
    "VCS-192", "VCS-1205", "VCS-753", "VCS-753", "VCS-192", 
    "VCS-830", "VCS-12", "VCS-823", "VCS-391", "VCS-892", 
    "VCS-12", "VCS-486", "VCS-1221", "VCS-51", "VCS-12", 
    "VCS-823", "VCS-905", "VCS-905", "VCS-51", "VCS-905", 
    "VCS-905", "VCS-850", "VCS-830", "VCS-1505", "VCS-51", 
    "VCS-1499", "VCS-414", "VCS-812", "VCS-1189", "VCS-2092", 
    "VCS-713", "VCS-1205", "VCS-708", "VCS-1258", "VCS-1100", 
    "VCS-12", "VCS-1345", "VCS-755", "VCS-1205", "VCS-792", 
    "VCS-1525", "VCS-921", "VCS-1258", "VCS-1143", "VCS-253", 
    "VCS-713", "VCS-414", "VCS-2092", "VCS-1427", "VCS-1291", 
    "VCS-493", "VCS-655", "VCS-1204", "VCS-1174", "VCS-68", 
    "VCS-1525", "VCS-892", "VCS-1356", "VCS-1160", "VCS-876", 
    "VCS-1427", "VCS-148", "VCS-1427", "VCS-708", "VCS-51", 
    "VCS-1160", "VCS-1174", "VCS-936", "VCS-12", "VCS-986", 
    "VCS-1508", "VCS-713", "VCS-758", "VCS-669", "VCS-1143", 
    "VCS-753", "VCS-1506", "VCS-1205", "VCS-2097", "VCS-330", 
    "VCS-253", "VCS-1160", "VCS-614", "VCS-614", "VCS-253", 
    "VCS-493", "VCS-528", "VCS-614", "VCS-493", "VCS-132", 
    "VCS-493", "VCS-1174", "VCS-614", "VCS-631", "VCS-493", 
    "VCS-493", "VCS-614", "VCS-1189", "VCS-132", "VCS-1140", 
    "VCS-493", "VCS-986", "VCS-493", "VCS-132", "VCS-1824", 
    "VCS-624", "VCS-274", "VCS-566", "VCS-1044", "VCS-493", 
    "VCS-619", "VCS-566", "VCS-566", "VCS-566", "VCS-330", 
    "VCS-1499", "VCS-682", "VCS-2089", "VCS-1140", "VCS-927", 
    "VCS-631", "VCS-1221", "VCS-584", "VCS-132", "VCS-330", 
    "VCS-1044", "VCS-1228", "VCS-274", "VCS-614", "VCS-274", 
    "VCS-982", "VCS-699", "VCS-338", "VCS-1190", 
    "VCS-529", "VCS-498", "VCS-498", "VCS-498", 
    "VCS-245", "VCS-1506", "VCS-274", "VCS-614", , 
    "VCS-1310", "VCS-1781", "VCS-498", "VCS-603", "VCS-1204", 
    "VCS-753", "VCS-733", "VCS-1693", "VCS-274", "VCS-498", 
    "VCS-1214", "VCS-1203", "VCS-265", "VCS-758", "VCS-1186", 
    "VCS-1497", "VCS-1506", "VCS-830", "VCS-1148", "VCS-1203", 
    "VCS-1758", "VCS-1578", "VCS-631", "VCS-493", "VCS-2092", 
    "VCS-251", "VCS-493", "VCS-414", "VCS-784", "VCS-274", 
    "VCS-1497", "VCS-1195", "VCS-1044", "VCS-758", "VCS-1301", 
    "VCS-1187", "VCS-1187", "VCS-1521", "VCS-1521", "VCS-1580", 
    "VCS-1189", "VCS-982", "VCS-1580", "VCS-265", "VCS-1021",     "VCS-1261",
    "VCS-1079",
    "VCS-1985",
    "VCS-1671",
    "VCS-1052",
    "VCS-1418",
    "VCS-2307",
    "VCS-439",
    "VCS-674" 
]

export const uniqueProjectIds = Array.from(new Set(proJectIds));
