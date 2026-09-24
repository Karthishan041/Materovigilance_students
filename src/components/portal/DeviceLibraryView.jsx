import React, { useState } from 'react';
import { 
  Search, Layers, ArrowRight, ArrowLeft, 
  Cpu, Activity, FileText, BookOpen, Download, Zap, HeartPulse, Wind, Droplets,
  Info, Check, AlertCircle
} from 'lucide-react';

export default function DeviceLibraryView({ onNavigate, isDarkMode = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const categories = [
    'All',
    'Infusion',
    'Monitoring',
    'Ventilation',
    'Resuscitation & Critical Care',
    'Surgical & Diagnostic'
  ];

  const devices = [
    {
      id: 'infusion-pump',
      name: 'Volumetric Infusion Pump',
      category: 'Infusion',
      riskClass: 'Class IIb / Class C',
      riskLevel: 'High Risk Device',
      imageIcon: Droplets,
      description: 'Electromechanical infusion system delivering intravenous fluids, parenteral nutrition, and critical medications at precisely controlled volumetric flow rates.',
      keySafetyAlert: 'Occlusion pressure sensor drift and anti-siphon free-flow risks.',
      whatIsIt: 'A volumetric infusion pump is a precision medical device that delivers intravenous fluids, electrolytes, total parenteral nutrition, and high-potency drugs directly into a patient\'s circulatory system under controlled pressure. Unlike gravity infusion sets, smart volumetric pumps utilize linear peristaltic fingers to overcome venous resistance and ensure exact milliliter-per-hour dosing accuracy.',
      howIsItUsed: '1. The clinician mounts the pump securely on an IV stand and connects it to AC power with battery backup enabled.\n2. The specialized IV administration set is loaded through the automated cassette channel, ensuring the anti-free-flow clamp engages.\n3. The operator selects the drug profile from the onboard Dose Error Reduction System (DERS) Drug Library.\n4. Primary infusion parameters (rate, volume to be infused [VTBI], and occlusion pressure limits) are programmed and dual-verified.\n5. Line priming and air-in-line purging are verified before attaching the luer lock to the patient’s vascular catheter.',
      keyComponents: [
        { name: 'Linear Peristaltic Drive Mechanism', desc: 'Camshaft-driven motor fingers that rhythmically compress silicone tubing to deliver precise fluid boluses.' },
        { name: 'Ultrasonic Air-in-Line Detector', desc: 'Piezoelectric sensor pair detecting single micro-bubbles (>50 µL) or cumulative air in the infusion line.' },
        { name: 'Upstream & Downstream Pressure Transducers', desc: 'Piezo-resistive sensors measuring line pressure to trigger occlusion alarms before catheter extravasation occurs.' },
        { name: 'Anti-Free-Flow Mechanism', desc: 'Mechanical safety clamp that automatically pinches the IV line shut whenever the pump door is opened.' },
        { name: 'DERS Software & Dual Microprocessors', desc: 'Fault-tolerant dual CPU architecture cross-checking flow calculations against hospital-defined soft/hard dose limits.' },
        { name: 'Lithium Backup Battery System', desc: 'Provides uninterrupted infusion during patient transport (minimum 4–6 hours operational runtime).' }
      ],
      safetyConsiderations: [
        'Always verify Drug Library hard and soft limits before overriding any rate alert.',
        'Ensure the anti-free-flow clamp is fully engaged prior to opening the pump cassette door.',
        'Set downstream occlusion pressure thresholds appropriately for neonatal vs. adult lines.',
        'Never silence recurring air-in-line alarms without visually inspecting the tubing and drip chamber.',
        'Verify battery health before inter-departmental transport of patients receiving inotropic infusions.'
      ],
      commonIssues: [
        'Occlusion Alarm Malfunction: Pressure sensor calibration drift leading to delayed occlusion warning and bolus release.',
        'Uncontrolled Free-Flow: Damaged or improperly seated anti-free-flow clamp delivering unmetered drug delivery.',
        'Air-in-Line False Alarms / False Negatives: Ultrasonic sensor misalignment due to cracked housing or optical contamination.',
        'Keypad Bounce / Rate Programming Errors: Faulty membrane keypad registering accidental double-digit entries (e.g. 100 mL/hr instead of 10 mL/hr).',
        'Battery Sudden Depletion: Premature battery failure during intra-hospital transit of critical care patients.'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 3: Medical Device Problem Reporting (MDPI)' },
        { id: 'course', title: 'Module 1: Fundamentals of Materiovigilance' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #402: ICU Smart Infusion Pump Over-Infusion Alert', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'syringe-pump',
      name: 'Precision Syringe Driver Pump',
      category: 'Infusion',
      riskClass: 'Class IIb / Class C',
      riskLevel: 'High Risk Device',
      imageIcon: Droplets,
      description: 'Motorized syringe driver designed for low-volume, micro-infusion delivery of concentrated medications (vasoactive agents, insulin, pediatric sedation).',
      keySafetyAlert: 'Syringe barrel dislodgement and siphonage hazards at low flow rates.',
      whatIsIt: 'A syringe driver pump is an electromechanical device that uses a lead-screw plunger driver to advance a standard or specialized syringe barrel at constant micro-rates (0.1 to 100 mL/hr) with sub-microliter precision.',
      howIsItUsed: 'Used extensively in ICUs, neonatal units, and operating rooms where minute volumes of high-potency drugs must be titrated with rapid pharmacokinetic response.',
      keyComponents: [
        { name: 'Stepper Motor Lead Screw Drive', desc: 'Micro-step motorized worm drive offering precision linear travel.' },
        { name: 'Syringe Flange & Plunger Detection Sensors', desc: 'Optical and mechanical switches confirming proper barrel positioning and syringe size identification.' },
        { name: 'Inline Force Transducer', desc: 'Continuous measuring of plunger backpressure to detect line blockage.' }
      ],
      safetyConsiderations: [
        'Ensure syringe brand and size selected in software exactly matches physical syringe loaded.',
        'Never place syringe pump significantly higher than patient to prevent gravity siphonage.',
        'Aspirate line slack to prevent post-occlusion bolus delivery.'
      ],
      commonIssues: [
        'Syringe Size Recognition Error leading to incorrect flow rate calibration.',
        'Plunger Clamp Disengagement resulting in unmetered drug delivery.',
        'Occlusion pressure delay at very low flow rates (<0.5 mL/hr).'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 2: Signal Detection & Risk Classification' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #108: Syringe Plunger Position Sensor Drift', difficulty: 'Advanced' }
      ]
    },
    {
      id: 'ventilator',
      name: 'ICU Mechanical Ventilator',
      category: 'Ventilation',
      riskClass: 'Class IIb / Class D',
      riskLevel: 'Life-Support Device',
      imageIcon: Wind,
      description: 'Critical life-support system providing automated positive pressure ventilation and physiological gas exchange for acute respiratory failure.',
      keySafetyAlert: 'Expiratory valve sticking, flow sensor condensation, and high peak pressure alarms.',
      whatIsIt: 'An intensive care mechanical ventilator is a computerized life-support machine that controls or assists patient breathing by delivering blended oxygen/air gas mixtures under strictly regulated pressure, volume, and timing waveforms.',
      howIsItUsed: 'Connected via endotracheal or tracheostomy tube, clinician sets FiO2, PEEP, tidal volume, respiratory rate, and trigger sensitivity tailored to the patient lung mechanics.',
      keyComponents: [
        { name: 'Pneumatic Proportional Solenoid Gas Valves', desc: 'High-speed valves regulating inspiratory gas flow and oxygen blending.' },
        { name: 'Expiratory Flow & Pressure Sensor Assembly', desc: 'Measures expired tidal volume and maintains positive end-expiratory pressure (PEEP).' },
        { name: 'Heated Expiratory Filter & Water Trap', desc: 'Prevents condensation from jamming expiratory valve membranes and protects environment.' },
        { name: 'Redundant Audible & Visual Alarm Grid', desc: '360-degree high-priority alarm beacon and multi-frequency sound transducer.' }
      ],
      safetyConsiderations: [
        'Perform pre-use circuit calibration and tightness test before every patient connection.',
        'Always maintain an active manual resuscitation bag (Ambu bag) at the bedside.',
        'Inspect and empty water traps regularly to prevent flow transducer measurement errors.'
      ],
      commonIssues: [
        'Expiratory valve sticking due to heated moisture/medication nebulization buildup.',
        'Flow sensor calibration drift triggering false disconnect alarms.',
        'Oxygen gas supply pressure drop failure to switch to ambient backup.'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 3: Adverse Event Reporting Workflows' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #304: Expiratory Valve Jamming during ARDS Ventilation', difficulty: 'Critical' }
      ]
    },
    {
      id: 'patient-monitor',
      name: 'Multiparameter Patient Monitor',
      category: 'Monitoring',
      riskClass: 'Class IIb / Class C',
      riskLevel: 'Monitoring System',
      imageIcon: Activity,
      description: 'Continuous physiological surveillance unit displaying multi-lead ECG, SpO2 plethysmograph, NIBP, invasive blood pressure (IBP), and EtCO2 capnography.',
      keySafetyAlert: 'Alarm fatigue, electrode detachment artifacts, and arrhythmia detection thresholds.',
      whatIsIt: 'Multiparameter monitors integrate multi-channel bio-signal acquisition modules to provide continuous real-time diagnostic waveforms and telemetry alerts to critical care clinicians.',
      howIsItUsed: 'Electrodes, optical sensors, and pressure lines are attached to the patient and plugged into isolated patient-cable interfaces with custom high/low alert thresholds.',
      keyComponents: [
        { name: 'ECG Isolated Front-End Circuitry', desc: 'Defibrillator-protected high-impedance differential bio-amplifiers with pacemaker rejection.' },
        { name: 'Dual-Wavelength SpO2 Photoplethysmograph', desc: 'Red and infrared LED sensors measuring arterial hemoglobin oxygen saturation.' },
        { name: 'Oscillometric NIBP Module', desc: 'Automated cuff deflation pump with high-precision pressure transducer.' },
        { name: 'Microstream EtCO2 Capnograph', desc: 'Infrared absorption chamber analyzing expired carbon dioxide waveforms.' }
      ],
      safetyConsiderations: [
        'Customize alarm limits per patient; never disable lethal arrhythmia alarms.',
        'Rotate SpO2 probe site every 4 hours to prevent pressure necrosis and burns.',
        'Verify correct NIBP cuff size to prevent blood pressure over/under-estimation.'
      ],
      commonIssues: [
        'ECG Lead motion artifact mimicking ventricular tachycardia / fibrillation.',
        'Alarm fatigue caused by uncalibrated high-frequency non-critical alarms.',
        'NIBP cuff hose leak preventing timely emergency cycle measurements.'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 2: Signal Detection & Risk Classification' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #215: Telemetry Artifact False Alarm Suppression', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'defibrillator',
      name: 'Biphasic Defibrillator & Monitor',
      category: 'Resuscitation & Critical Care',
      riskClass: 'Class III / Class D',
      riskLevel: 'Critical Emergency',
      imageIcon: Zap,
      description: 'Emergency resuscitation system delivering controlled biphasic electric countershocks to terminate ventricular fibrillation and pulseless ventricular tachycardia.',
      keySafetyAlert: 'Battery load degradation, capacitor charging latency, and paddle contact impedance.',
      whatIsIt: 'A biphasic defibrillator is an emergency cardiac device that stores electrical charge in high-voltage capacitors and delivers an impedance-compensated current waveform across the myocardium to depolarize cardiac muscle and restore sinus rhythm.',
      howIsItUsed: 'Used in emergency resuscitation (manual defibrillation, synchronized cardioversion, and non-invasive transcutaneous cardiac pacing).',
      keyComponents: [
        { name: 'High-Energy Capacitor & Biphasic H-Bridge', desc: 'Charges up to 360 Joules and switches polarity mid-pulse to minimize myocardial damage.' },
        { name: 'Patient Impedance Compensation Circuit', desc: 'Adjusts pulse width based on transthoracic resistance (25–175 Ohms).' },
        { name: 'Pacing Pulse Generator', desc: 'Delivers adjustable current pulses (0–200 mA) for severe symptomatic bradycardia.' },
        { name: 'Internal Daily Self-Test & Diagnostic Unit', desc: 'Performs 30-Joule internal discharge test and reports ready-state indicator.' }
      ],
      safetyConsiderations: [
        'Clear all personnel before announcing shock delivery ("All Clear").',
        'Verify synchronized cardioversion marker on R-wave when treating unstable AF/VT.',
        'Ensure daily operational checkout and battery load test are recorded in vigilance log.'
      ],
      commonIssues: [
        'Defibrillator fails to charge during cardiac arrest due to degraded battery cells.',
        'Sticky energy selector switch failing to deliver selected Joules.',
        'Pediatric paddle adapter contact failure during emergency resuscitation.'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 1: Fundamentals of Materiovigilance' },
        { id: 'course', title: 'Module 3: Adverse Event Reporting Workflows' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #102: Defibrillator Capacitor Discharge Failure', difficulty: 'Critical' }
      ]
    },
    {
      id: 'hemodialysis',
      name: 'Hemodialysis Extracorporeal Unit',
      category: 'Surgical & Diagnostic',
      riskClass: 'Class IIb / Class D',
      riskLevel: 'Extracorporeal Therapy',
      imageIcon: HeartPulse,
      description: 'Extracorporeal blood purification system removing metabolic toxins and fluid overload for end-stage renal disease and acute renal failure.',
      keySafetyAlert: 'Venous bubble trap optical sensor triggers and dialysate conductivity deviation.',
      whatIsIt: 'A hemodialysis machine circulates patient blood through an artificial kidney (dialyzer) while generating ultrapure dialysate fluid to remove metabolic toxins, urea, and excess volume.',
      howIsItUsed: 'Vascular access lines (arterial and venous) are primed with anticoagulant and connected under continuous venous pressure and temperature surveillance.',
      keyComponents: [
        { name: 'Blood Roller Pump', desc: 'Occlusive peristaltic pump controlling extracorporeal blood flow (200–500 mL/min).' },
        { name: 'Dialysate Proportioning & Conductivity Cell', desc: 'Mixes acid/bicarbonate concentrates with reverse-osmosis water to tight ionic tolerances.' },
        { name: 'Optical Blood Leak Detector', desc: 'Detects minute traces of red blood cells in spent dialysate indicating dialyzer membrane rupture.' },
        { name: 'Venous Air Bubble Trap & Clamp', desc: 'Ultrasonic sensor and rapid solenoid clamp stopping air emboli before reaching patient.' }
      ],
      safetyConsiderations: [
        'Always calibrate dialysate conductivity with independent external meter before treatment.',
        'Never bypass venous line air detector during active dialysis.',
        'Inspect dialyzer fiber integrity and monitor transmembrane pressure (TMP) trends.'
      ],
      commonIssues: [
        'Conductivity sensor malfunction causing dialysate hyper/hypo-osmolality.',
        'Blood leak optical detector false negative during high-flux dialysis.',
        'Venous line clamp solenoid seizing due to mechanical wear.'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 2: Signal Detection & Risk Classification' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #501: Dialysate Temperature Alert & Hemolysis Risk', difficulty: 'Advanced' }
      ]
    },
    {
      id: 'pulse-oximeter',
      name: 'Pulse Oximeter & Capnograph (CO2)',
      category: 'Monitoring',
      riskClass: 'Class IIa / Class B',
      riskLevel: 'Diagnostic Sensor',
      imageIcon: Activity,
      description: 'Non-invasive continuous monitoring of arterial hemoglobin oxygen saturation (SpO2) and end-tidal carbon dioxide (EtCO2).',
      keySafetyAlert: 'Hypoperfusion signal attenuation and sensor placement burn prevention.',
      whatIsIt: 'A dual-spectrophotometric optical sensor that calculates arterial oxygen saturation by comparing red (660 nm) and infrared (940 nm) light absorption ratios in pulsating vascular beds.',
      howIsItUsed: 'Attached to finger, earlobe, or forehead; essential during anesthesia, procedural sedation, and critical care monitoring.',
      keyComponents: [
        { name: 'Dual-Wavelength LED Emitters', desc: 'High-efficiency 660nm (Red) and 940nm (IR) micro-diodes.' },
        { name: 'Silicon Photodiode Receiver', desc: 'Low-noise photodetector with ambient light cancellation filter.' },
        { name: 'Microprocessor Plethysmograph Engine', desc: 'Filters motion artifacts and calculates perfusion index (PI).' }
      ],
      safetyConsiderations: [
        'Change sensor site every 4 hours to avoid pressure injury.',
        'Do not place probe on the same arm as an automated blood pressure cuff.',
        'Recognize limitations in carboxyhemoglobinemia and severe shock states.'
      ],
      commonIssues: [
        'Hypoperfusion and ambient sunlight causing erratic SpO2 readouts.',
        'Overheating probe causing superficial skin burns in neonates.',
        'Sensor cable break inside silicone strain relief jacket.'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 1: Fundamentals of Materiovigilance' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #112: Nail Polish & Peripheral Vasoconstriction SpO2 Artifact', difficulty: 'Essential' }
      ]
    },
    {
      id: 'esu-diathermy',
      name: 'Electrosurgical Unit (ESU / Diathermy)',
      category: 'Surgical & Diagnostic',
      riskClass: 'Class IIb / Class C',
      riskLevel: 'Surgical RF Generator',
      imageIcon: Zap,
      description: 'High-frequency radiofrequency electrical generator used in operating theaters to cut tissue and achieve surgical coagulation/hemostasis.',
      keySafetyAlert: 'Patient return electrode (grounding pad) thermal burns and electromagnetic interference.',
      whatIsIt: 'An electrosurgical generator converts line frequency (50/60 Hz) into high-frequency RF current (300 kHz to 3 MHz) to vaporize or coagulate tissue through concentrated electrical resistance heating.',
      howIsItUsed: 'Operated in Monopolar (requires patient return plate) or Bipolar (current confined between tweezer tips) modes during surgical procedures.',
      keyComponents: [
        { name: 'RF Power Amplifier & Output Transformer', desc: 'Generates up to 300W of high-frequency cutting and fulguration waveforms.' },
        { name: 'Contact Quality Monitoring (CQM) Circuit', desc: 'Continuously measures impedance across split patient return electrodes to prevent thermal burns.' },
        { name: 'Foot Pedal & Pencil Handswitch Interface', desc: 'Hermetically sealed dual switches for Cut and Coag activation.' }
      ],
      safetyConsiderations: [
        'Ensure full skin contact of patient return electrode on well-vascularized muscular area.',
        'Never place grounding pad over bony prominences, scar tissue, or metallic orthopedic implants.',
        'Allow alcohol-based surgical skin preps to dry completely before activating RF current.'
      ],
      commonIssues: [
        'Grounding pad detachment causing high-current density burns at alternate contact points (e.g. ECG leads).',
        'Handpiece activation switch short-circuit leading to unintended continuous discharge.',
        'Electromagnetic interference (EMI) with implanted cardiac pacemakers and defibrillators.'
      ],
      relatedModules: [
        { id: 'course', title: 'Module 2: Signal Detection & Risk Classification' }
      ],
      relatedCases: [
        { id: 'practice', title: 'Case #408: Operating Room Grounding Pad Detachment Burn Investigation', difficulty: 'Advanced' }
      ]
    }
  ];

  // Filtering Logic
  const filteredDevices = devices.filter(device => {
    const matchesCategory = selectedCategory === 'All' || device.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesQuery = device.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         device.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.riskClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // TECHNICAL DETAIL VIEW
  if (selectedDevice) {
    const IconComp = selectedDevice.imageIcon || Layers;
    return (
      <div className={`space-y-5 pb-10 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
        
        {/* Navigation / Action Bar */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between ${
          isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
        } px-5 py-3.5 rounded-xl border gap-3 transition-colors`}>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedDevice(null)}
              className="text-[#0088FF] hover:underline font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Device Reference Library</span>
            </button>
            <span className={isDarkMode ? 'text-[#263554]' : 'text-[#E2E8F0]'}>/</span>
            <span className={`font-bold truncate ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>{selectedDevice.name}</span>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => setSelectedDevice(null)}
              className={`${
                isDarkMode 
                  ? 'bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554] text-[#F8FAFC]' 
                  : 'bg-white hover:bg-[#F7F9FC] border-[#E2E8F0] text-[#172033]'
              } border font-semibold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5`}
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
              <span>Back to Library</span>
            </button>
            <button
              onClick={() => alert(`Technical Safety Summary for ${selectedDevice.name} downloaded.`)}
              className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Technical Sheet</span>
            </button>
          </div>
        </div>

        {/* Device Hero Card */}
        <div className={`${
          isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
        } rounded-xl p-6 border flex flex-col md:flex-row items-start justify-between gap-6 transition-colors`}>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
              isDarkMode ? 'bg-[#0088FF]/15 border border-[#0088FF]/30 text-[#0088FF]' : 'bg-[#F0F7FF] border border-[#0088FF]/20 text-[#0088FF]'
            }`}>
              <IconComp className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[#0088FF] text-xs font-bold uppercase tracking-wider">
                  {selectedDevice.category}
                </span>
                <span className={isDarkMode ? 'text-[#263554]' : 'text-[#E2E8F0]'}>•</span>
                <span className={`text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                  {selectedDevice.riskClass} ({selectedDevice.riskLevel})
                </span>
              </div>

              <h1 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                {selectedDevice.name}
              </h1>

              <p className={`text-xs max-w-3xl leading-relaxed pt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                {selectedDevice.description}
              </p>
            </div>
          </div>
        </div>

        {/* Section 1 & 2: Clinical Overview & Usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 border space-y-2.5 transition-colors`}>
            <div className={`flex items-center gap-2 border-b pb-2 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
              <Info className="w-4 h-4 text-[#0088FF]" />
              <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>1. What is it?</h3>
            </div>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              {selectedDevice.whatIsIt}
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 border space-y-2.5 transition-colors`}>
            <div className={`flex items-center gap-2 border-b pb-2 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
              <Cpu className="w-4 h-4 text-[#0088FF]" />
              <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>2. How is it used?</h3>
            </div>
            <div className={`text-xs leading-relaxed whitespace-pre-line ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              {selectedDevice.howIsItUsed}
            </div>
          </div>

        </div>

        {/* Section 3: Key Components */}
        <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 border space-y-3.5 transition-colors`}>
          <div className={`flex items-center justify-between border-b pb-2 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0088FF]" />
              <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>3. Key Components & Subsystems</h3>
            </div>
            <span className={`text-[11px] font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              {selectedDevice.keyComponents.length} Subsystems
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedDevice.keyComponents.map((comp, idx) => (
              <div key={idx} className={`${isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'} p-3.5 rounded-lg border space-y-1`}>
                <h4 className={`font-bold text-xs ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                  {idx + 1}. {comp.name}
                </h4>
                <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 & 5: Safety Considerations & Common Issues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Safety Considerations */}
          <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 border space-y-3 transition-colors`}>
            <div className={`flex items-center gap-2 border-b pb-2 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
              <Check className="w-4 h-4 text-[#0088FF]" />
              <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>4. Safety Considerations & SOPs</h3>
            </div>
            <ul className="space-y-2">
              {selectedDevice.safetyConsiderations.map((item, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-xs ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Issues & Risks */}
          <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 border space-y-3 transition-colors`}>
            <div className={`flex items-center gap-2 border-b pb-2 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
              <AlertCircle className={`w-4 h-4 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
              <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>5. Common Issues & Materiovigilance Risks</h3>
            </div>
            <ul className="space-y-2">
              {selectedDevice.commonIssues.map((issue, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-xs ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isDarkMode ? 'bg-[#94A3B8]' : 'bg-[#64748B]'}`} />
                  <span className="leading-relaxed font-medium">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Section 6: Related Curriculum */}
        <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 border space-y-3.5 transition-colors`}>
          <div className={`border-b pb-2 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
            <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              6. Related Curriculum Modules
            </h3>
          </div>

          <div className="space-y-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              <BookOpen className="w-3.5 h-3.5 text-[#0088FF]" />
              <span>Related Modules</span>
            </span>
            {selectedDevice.relatedModules.map((mod, idx) => (
              <div key={idx} className={`${isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'} p-3 rounded-lg border flex items-center justify-between`}>
                <span className={`text-xs font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>{mod.title}</span>
                <button
                  onClick={() => onNavigate && onNavigate(mod.id)}
                  className="text-xs font-semibold text-[#0088FF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Module</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // DEFAULT VIEW: Device Library List / Grid
  return (
    <div className={`space-y-5 pb-10 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
      
      {/* Page Header */}
      <div className={`${
        isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
      } rounded-xl p-5 sm:p-6 border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              Device Reference Library
            </h1>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${
              isDarkMode 
                ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' 
                : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
            }`}>
              {devices.length} Devices
            </span>
          </div>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Search medical devices and review technical operation, key components, safety considerations, and common materiovigilance issues.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className={`${
        isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
      } rounded-xl p-4 border space-y-3 transition-colors`}>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
          <input
            type="text"
            placeholder="Search devices by name, category, or risk class..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg outline-none transition-all ${
              isDarkMode
                ? 'bg-[#202D4E] border border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:bg-[#202D4E] focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20'
                : 'bg-[#F7F9FC] border border-[#E2E8F0] text-[#172033] placeholder:text-[#64748B] focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/15'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-2.5 text-xs font-medium cursor-pointer ${
                isDarkMode ? 'text-[#94A3B8] hover:text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span className={`text-[11px] font-bold mr-1 shrink-0 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0088FF] text-white'
                  : isDarkMode
                    ? 'bg-[#202D4E] border border-[#263554] text-[#94A3B8] hover:border-[#0088FF]/50 hover:text-[#F8FAFC]'
                    : 'bg-[#F7F9FC] border border-[#E2E8F0] text-[#172033] hover:border-[#CBD5E1] hover:text-[#0088FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Device Grid */}
      {filteredDevices.length === 0 ? (
        <div className={`${
          isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
        } rounded-xl p-10 border text-center space-y-2.5 transition-colors`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
            isDarkMode ? 'bg-[#202D4E] border border-[#263554] text-[#94A3B8]' : 'bg-[#F7F9FC] border border-[#E2E8F0] text-[#64748B]'
          }`}>
            <Search className="w-5 h-5" />
          </div>
          <h3 className={`font-bold text-sm ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>No medical devices found</h3>
          <p className={`text-xs max-w-sm mx-auto ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            No devices matched "{searchQuery}" under "{selectedCategory}".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="bg-[#0088FF] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#0070D2] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => {
            const shortSummary = 
              device.id === 'infusion-pump' ? 'Electromechanical infusion system' :
              device.id === 'syringe-pump' ? 'Low-volume micro-infusion delivery system' :
              device.id === 'ventilator' ? 'Automated positive pressure ventilation system' :
              device.id === 'pulse-oximeter' ? 'Non-invasive arterial oxygen and capnography monitoring' :
              device.id === 'esu-diathermy' ? 'High-frequency RF tissue cutting and coagulation' :
              device.description.split('.')[0];

            return (
              <div
                key={device.id}
                className={`${
                  isDarkMode 
                    ? 'bg-[#17213C] border-[#263554] hover:border-[#0088FF]/50' 
                    : 'bg-white border-[#E2E8F0] hover:border-[#0088FF]/40'
                } rounded-xl p-4.5 border transition-all flex flex-col justify-between space-y-3.5`}
              >
                <div className="space-y-2">
                  {/* Category & Risk Level */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isDarkMode
                        ? 'bg-[#0088FF]/15 border border-[#0088FF]/30 text-[#0088FF]'
                        : 'bg-[#F0F7FF] border border-[#0088FF]/20 text-[#0088FF]'
                    }`}>
                      {device.category} • {device.riskLevel}
                    </span>
                  </div>

                  {/* Device Name & Concise 1-line Description */}
                  <div className="pt-1 space-y-1">
                    <h3 className={`font-bold text-sm leading-snug ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                      {device.name}
                    </h3>
                    <p className={`text-xs italic leading-relaxed truncate ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      "{shortSummary}"
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className={`border-t pt-3 ${isDarkMode ? 'border-[#263554]' : 'border-[#F1F5F9]'}`}>
                  <button
                    onClick={() => setSelectedDevice(device)}
                    className={`w-full ${
                      isDarkMode
                        ? 'bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554] text-[#F8FAFC] hover:border-[#0088FF]'
                        : 'bg-white hover:bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] hover:text-[#0088FF] hover:border-[#0088FF]'
                    } border font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer`}
                  >
                    <span>View Device</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
