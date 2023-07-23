import React from 'react';
import ExcelJS from 'exceljs';
import { Button, Card, Typography } from '@material-tailwind/react';

const TABLE_HEAD = ['Band Name', 'Date', 'Income', 'Musical Style'];

const ReportTable = (props) => {
  const { data, reportsNameList } = props;


  const handleExportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Events');

    // Styling
    const headerRow = worksheet.addRow(TABLE_HEAD);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 14 }; // Change the font size to 12
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '336699' },
      };
      cell.alignment = { horizontal: 'center' };
    });

    // Add data rows
    reportsNameList?.data?.forEach((event) => {
      const rowData = [
        event.BandName, // Replace with the actual property name in your data
        event.date, // Replace with the actual property name in your data
        event.Income, // Replace with the actual property name in your data
        event.MusicalTypeName, // Replace with the actual property name in your data
      ];
      const row = worksheet.addRow(rowData);
      row.eachCell((cell) => {
        cell.font = { size: 12 };
        cell.alignment = { horizontal: 'center' };
      });
    });

    // Calculate total revenue
    const totalRevenueFormula = `SUM(C2:C${reportsNameList?.data?.length + 1})`;
    const totalRevenueRow = worksheet.insertRow(7, [
      'Total Revenue',
      { formula: totalRevenueFormula },
    ]);
    totalRevenueRow.getCell(2).font = {
      bold: true,
    };
    totalRevenueRow.font = { size: 18 };

    totalRevenueRow.getCell(2).numFmt = '0,00.00';
    totalRevenueRow.getCell(1).alignment = { horizontal: 'center' };
    totalRevenueRow.getCell(2).alignment = { horizontal: 'center' };

    // Adjust column widths based on content length
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnWidth = cell.value ? cell.value.toString().length + 5 : 10;
        if (columnWidth > maxLength) {
          maxLength = columnWidth;
        }
      });
      column.width = maxLength < 20 ? 20 : maxLength;
    });
    // Save workbook as XLSX file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Event_reports_${data.startDate}-${data.endDate}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <Button className="w-1/4" onClick={handleExportToExcel}>
        Export To Excel File
      </Button>
      <Card className="overflow-scroll overflow-x-hidden h-96 w-full mt-5">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 z-0">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportsNameList?.data?.map(
              ({ EventID, BandName, date, Income, MusicalTypeName }, index) => {
                const isLast = index === reportsNameList?.data?.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={EventID}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {BandName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Income}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-medium">
                        {MusicalTypeName}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ReportTable;
