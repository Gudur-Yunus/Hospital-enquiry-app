const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser for comprehensive A-to-Z UI & 3D visual audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2200));

  // 1. Capture Main Home with Clean 3D Mannequin (No Dots/Spheres)
  await page.screenshot({ path: 'clean_3d_body_home.png' });
  console.log('1. Main Home (Clean 3D Body) captured at: clean_3d_body_home.png');

  // Helper to close modal
  const closeModal = async () => {
    const closeBtn = await page.$('button[aria-label="Close"], button[aria-label="Close Modal"]');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise(r => setTimeout(r, 600));
    }
  };

  // 2. Head Zone Triage Modal
  const headPill = await page.$('#zone-pill-head');
  if (headPill) {
    await headPill.click();
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: 'clean_head_modal.png' });
    console.log('2. Head & Brain Triage Modal captured at: clean_head_modal.png');
    await closeModal();
  }

  // 3. Chest Zone Triage Modal
  const chestPill = await page.$('#zone-pill-chest');
  if (chestPill) {
    await chestPill.click();
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: 'clean_chest_modal.png' });
    console.log('3. Chest & Heart Triage Modal captured at: clean_chest_modal.png');
    await closeModal();
  }

  // 4. Stomach Zone Triage Modal
  const stomachPill = await page.$('#zone-pill-stomach');
  if (stomachPill) {
    await stomachPill.click();
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: 'clean_stomach_modal.png' });
    console.log('4. Stomach & Abdomen Triage Modal captured at: clean_stomach_modal.png');
    await closeModal();
  }

  // 5. Limbs Zone Triage Modal with Symptom Selected
  const limbsPill = await page.$('#zone-pill-limbs');
  if (limbsPill) {
    await limbsPill.click();
    await new Promise(r => setTimeout(r, 900));
    
    // Select first symptom
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const symptomBtn = buttons.find(b => b.textContent.includes('Fracture') || b.textContent.includes('Knee'));
      if (symptomBtn) symptomBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'clean_limbs_modal.png' });
    console.log('5. Limbs & Joints Triage Modal captured at: clean_limbs_modal.png');
    await closeModal();
  }

  // 6. Appointment Flow Modal
  const apptCard = await page.$('#card-appointment');
  if (apptCard) {
    await apptCard.click();
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: 'clean_appointment_modal.png' });
    console.log('6. Appointment Modal captured at: clean_appointment_modal.png');
    await closeModal();
  }

  // 7. Department Navigation Modal
  const deptCard = await page.$('#card-department');
  if (deptCard) {
    await deptCard.click();
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: 'clean_department_modal.png' });
    console.log('7. Department Modal captured at: clean_department_modal.png');
    await closeModal();
  }

  // 8. Billing Flow Modal
  const billingCard = await page.$('#card-billing');
  if (billingCard) {
    await billingCard.click();
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: 'clean_billing_modal.png' });
    console.log('8. Billing Modal captured at: clean_billing_modal.png');
    await closeModal();
  }

  // 9. Emergency Screen Modal
  const emergencyBtn = await page.$('#emergency-btn');
  if (emergencyBtn) {
    await emergencyBtn.click();
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: 'clean_emergency_modal.png' });
    console.log('9. Emergency Modal captured at: clean_emergency_modal.png');
    await closeModal();
  }

  await browser.close();
  console.log('Comprehensive UI & UX audit complete!');
})();
