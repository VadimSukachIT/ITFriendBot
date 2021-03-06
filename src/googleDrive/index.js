import { google } from 'googleapis';

import credentials from '../../credentials.json';
import { SPREADSHEET_ID } from '../configs';

const scopes = [
  'https://www.googleapis.com/auth/drive'
];

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

export const saveUserRequestToGoogleDrive = async (user) => {
  const response = await drive.files.get({ fileId: SPREADSHEET_ID });

  const sheet = response.data;

  let sheetData = [
    [
      user.country,
      user.phone,
      user.messenger,
      user.email,
      user.speciality,
      user.age,
      user.name,
      user.parentName,
    ]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheet.id,
    valueInputOption: 'USER_ENTERED',
    range: 'A2',
    resource: {
      range: 'A2',
      majorDimension: 'ROWS',
      values: sheetData,
    },
  });

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheet.id,
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              startRowIndex: 0,
              endRowIndex: 1
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: {
                  red: 0.2,
                  green: 0.2,
                  blue: 0.2
                },
                textFormat: {
                  foregroundColor: {
                    red: 1,
                    green: 1,
                    blue: 1
                  },
                  bold: true,
                }
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)'
          }
        },
      ]
    }
  });
}