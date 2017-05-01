// export const UserType = [
// 	"Admin",
// 	"Executive"
// ];

// export const UserStatus = [
// 	"Active",
// 	"Inactive"
// ];

// export enum TICKET_SOURCE_ENUM {
// 	"Facebook" = 1,
// 	"Twitter" = 2,
// 	"Email" = 3,
// 	"Playstore" = 4,
// 	"Other" = 5
// }

// export const DOMINOS_BRAND_ID = '334';
// export const USER_STATUS = convertEnumToKeyValueArray({ "Active": 1, "Inactive": 0 });

// export const SENTIMENTS_ENUM = { "POSITIVE": 0, "NEUTRAL": 2, "NEGATIVE": 1 };
// export const SENTIMENTS = convertEnumToKeyValueArray(SENTIMENTS_ENUM);

// export const TICKET_ACCESS_LEVEL = convertEnumToKeyValueArray({ "Myself": 1, "Team": 2, "All": 3 });

// export const ROLE_ENUM = convertEnumToKeyValueArray({ "Admin": 1, "Supervisor": 3, "Executive User": 2, "Analyst": 4 });
// export const ROLE_ENUM_OBJ = { "Admin": "1", "Supervisor": "3", "Executive_User": "2", "Analyst": "4" }

// export const ROLE_ENUM_WITH_TEAM = convertEnumToKeyValueArray({ "Admin": 1, "Executive": 2 });

// export const REOPEN_SOURCE = convertEnumToKeyValueArray({ "FACEBOOK": 1, "TWITTER": 2, "PLAYSTORE": 4 });

// export const SOURCE_NAMES_OBJ = { "Facebook": 1, "Twitter": 2, "Email": 3, "Playstore": 4, "Other": 5 };
// export const SOURCE_NAME = convertEnumToKeyValueArray(SOURCE_NAMES_OBJ);

// export const CANNED_SOURCE = convertEnumToKeyValueArray({ "ALL": 0, "FACEBOOK": 1, "TWITTER": 2, "PLAYSTORE": 4, "EMAIL": 3, "OTHER": 5 });

// export const TICKET_PRIORITY = convertEnumToKeyValueArray({ "Low": 0, "High": 1, "Urgent": 2 });

// export const TICKET_STATUS = { "NEW": 0, "OPEN": 1, "PENDING": 2, "AWAITING_RESPONSE": 3, "RESOLVED": 4, "CLOSED": 5 };
// export const TICKET_STATUS_ARRAY = convertEnumToKeyValueArray({ "New": 0, "Open": 1, "Pending": 2, "Awaiting Response": 3, "Resolved": 4, "Closed": 5 });

export function convertEnumToKeyValueArray(enumVar) {
	let arr = [];
	for (let key in enumVar) {
		let obj = {};
		obj['key'] = key;
		obj['value'] = enumVar[key];
		arr.push(obj);
	}
	return arr;
}

export function getKeyFromValue(obj, val) {
	let k;
	for (let key in obj) {
		if (obj[key] == val) {
			k = key;
			break;
		}
	}
	return k;
}
