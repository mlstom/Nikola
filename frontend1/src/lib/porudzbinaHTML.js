export function generateOrderEmail(order) {
  const { id, date, items, cartTotal, shipping, discount, amountDue, customer } = order;
  const itemsRows = items
    .map(
      item => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.price} RSD</td>
        </tr>
      `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html lang="sr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Potvrda porudžbine #${id}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <!-- Logo -->
            <img src="https://alatinidza.rs/logo.png" alt="Alatinidza Logo" width="150" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td>
            <table width="600" align="center" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
              <!-- Header with package icon -->
              <tr style="background-color: #4CAF50; color: #ffffff;">
                <td style="padding: 20px; display: flex; align-items: center;">
                  <img src="https://alatinidza.rs/icons/package.png" alt="Package" width="40" style="margin-right: 10px;" />
                  <h1 style="font-size: 24px; margin: 0;">Uspešna porudžbina</h1>
                </td>
              </tr>
              <!-- Order Info -->
              <tr>
                <td style="padding: 20px;">
                  <p>Zdravo ${customer.name},</p>
                  <p>Hvala na kupovini! Tvoja porudžbina <strong>#${id}</strong> je uspešno primljena dana <strong>${new Date(date).toLocaleDateString('sr-RS')}</strong>.</p>

                  <!-- Items Table -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
                    <thead>
                      <tr style="background-color: #f2f2f2;">
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Proizvod</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Količina</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Cena</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsRows}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>Ukupna cena korpe:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>${cartTotal} RSD</strong></td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>Poštarina:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>${shipping} RSD</strong></td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>Popust:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>-${discount} RSD</strong></td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right; background-color: #f9f9f9;"><strong>Iznos za uplatu:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: right; background-color: #f9f9f9;"><strong>${amountDue} RSD</strong></td>
                      </tr>
                    </tfoot>
                  </table>

                  <p style="margin-top: 20px;">Uskoro ce vas kontaktirati neko iz naseg tima.</p>
                  <p>Srdačno,<br/>Tim Alatinidza.rs</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td align="center" style="padding: 20px; font-size: 12px; color: #888888;">
            <p>© ${new Date().getFullYear()} Alatinidza.rs. Sva prava zadržana.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
