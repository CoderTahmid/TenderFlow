export const en = {
  // Brand & Nav
  appName: "TenderFlow",
  tagline: "Build. Check. Submit.",
  dashboard: "Dashboard",
  workspace: "Workspace",
  review: "Review Package",
  help: "Help & Guide",
  language: "Language",
  english: "English",
  bangla: "বাংলা",
  
  // Steps
  stepTender: "Tender Info",
  stepDocuments: "Documents",
  stepMatching: "Matching",
  stepValidation: "Validation",
  stepGenerate: "Generate",

  // Landing / Dashboard
  heroTitle: "Prepare your tender package with confidence.",
  heroSubtitle: "Upload your tender requirements and documents. TenderFlow checks everything before generating your final submission package.",
  startNewTender: "Start New Tender",
  loadRequirements: "Load Requirements (JSON)",
  tryDemo: "Try Demo Package",
  workflowTitle: "How TenderFlow Works",
  workflowStep1Title: "1. Load Requirements",
  workflowStep1Desc: "Import requirements.json with tender details & doc checklist.",
  workflowStep2Title: "2. Upload Documents",
  workflowStep2Desc: "Add up to 30 PDF files (max 50 MB total).",
  workflowStep3Title: "3. Match & Set Dates",
  workflowStep3Desc: "Match PDFs to required docs & enter expiry dates.",
  workflowStep4Title: "4. Resolve Issues",
  workflowStep4Desc: "Fix missing docs, duplicates, or expired items.",
  workflowStep5Title: "5. Generate Package",
  workflowStep5Desc: "Compile final single PDF with cover page & footers.",

  // Features highlight
  privacyDesc: "Your files never leave your browser. Zero server uploads.",
  
  // Tender Summary Card
  tenderDetails: "Tender Details",
  tenderId: "Tender ID",
  tenderTitle: "Tender Title",
  procuringEntity: "Procuring Entity",
  bidderName: "Bidder Name",
  submissionDeadline: "Submission Deadline",
  changeTender: "Load Different JSON",

  // Upload Zone
  uploadTitle: "Drop PDF files here",
  uploadSubtitle: "or click to browse from your computer",
  uploadLimits: "PDF only • Up to 30 files • 50 MB total",
  uploadedFilesTitle: "Uploaded PDF Files",
  noFilesUploaded: "No PDF files uploaded yet. Drag & drop or browse to add files.",
  fileSize: "Size",
  pages: "pages",
  page: "page",
  removeFile: "Remove",
  previewPdf: "Preview",
  duplicateWarning: "Duplicate file detected. Has identical content to another uploaded PDF.",
  errOnlyPdf: "Only PDF files are allowed.",
  errMaxFiles: "Maximum 30 files allowed.",
  errMaxSize: "Total file size exceeds 50 MB limit.",
  errReadingPdf: "Unable to read this PDF file.",

  // Requirements Table & Matching
  documentChecklist: "Required Document Checklist",
  order: "Order",
  documentName: "Document Name",
  requirementType: "Requirement",
  required: "Required",
  optional: "Optional",
  hasExpiry: "Expiry Needed",
  matchedFile: "Matched File",
  expiryDate: "Expiry Date",
  status: "Status",
  action: "Action",
  selectPdfPlaceholder: "-- Select PDF Document --",
  unmatch: "Unmatch",
  changeMatch: "Change",
  enterDate: "Select expiry date",

  // Statuses & Badges
  statusMissing: "Missing",
  statusMissingDesc: "Required document has not been matched.",
  statusExpiryNeeded: "Expiry date needed",
  statusExpiryNeededDesc: "Enter the expiry date to continue.",
  statusExpired: "Expired",
  statusExpiredDesc: "Document expires before the tender submission deadline.",
  statusNotProvided: "Not provided",
  statusNotProvidedDesc: "Optional document was omitted.",
  statusOk: "OK",
  statusOkDesc: "Document is valid for submission.",

  // Validation Summary
  docStatusSummary: "Document Status Summary",
  totalReqs: "Total Requirements",
  validDocs: "Valid & Ready",
  blockingIssues: "blocking issue(s) must be resolved before the package can be generated.",
  allReady: "All required documents are valid and ready for package generation.",
  
  // Navigation & Buttons
  backToDashboard: "Back to Dashboard",
  goToWorkspace: "Go to Workspace",
  proceedToReview: "Proceed to Review",
  backToWorkspace: "Back to Workspace",
  generatePackage: "Generate Package",
  downloadPackage: "Download Package",
  generatingPackage: "Generating Package...",
  readyToGenerate: "Ready to Generate",
  resolveBlockingFirst: "Resolve all blocking issues to generate the package.",

  // Review Page
  reviewTitle: "Final Package Review",
  reviewSubtitle: "Verify all tender documents before final PDF package generation.",
  includedDocsCount: "Included Documents",
  excludedDocsCount: "Excluded Optional Docs",
  readyConfirmation: "Everything looks ready for submission.",
  coverPageNotice: "Page 1 of the generated PDF will be an official cover page in English detailing tender specifications.",

  // Success Page
  successTitle: "Your tender package is ready!",
  successSubtitle: "The complete tender document package has been generated successfully.",
  generatedFileName: "File Name",
  totalGeneratedPages: "Total Pages",
  packageStats: "Package Statistics",
  downloadInstruction: "Your download should start automatically. If not, click the download button below.",

  // Help & Privacy
  helpTitle: "Help & Instructions",
  helpSection1: "1. Importing Requirements",
  helpSection1Body: "Click 'Load Requirements' and select your requirements.json file. You can also click 'Try Demo Package' to test with pre-built tender criteria.",
  helpSection2: "2. Uploading PDFs",
  helpSection2Body: "Drag & drop your scanned or digital PDF documents into the upload box. TenderFlow automatically counts pages and scans for duplicate file contents.",
  helpSection3: "3. Matching & Expiry Verification",
  helpSection3Body: "Select which uploaded PDF corresponds to each document requirement. For items with expiry dates, enter the expiration date. TenderFlow will automatically check if the document remains valid through the tender submission deadline.",
  helpSection4: "4. Status Indicators",
  helpSection4Body: "Red items (Missing/Expired) and Amber items (Expiry date needed) block package generation. Optional documents marked 'Not provided' do not block submission.",
  helpSection5: "5. Security & Confidentiality",
  helpSection5Body: "TenderFlow runs 100% inside your browser session. Your documents, corporate identity, and tender data are NEVER transmitted to external servers or cloud services.",
  
  // JSON Load Error
  invalidJsonError: "Unable to load requirements.json. Please check that the file follows the required tender format.",
  
  // Footer
  footerText: "TenderFlow — Official Tender Package Builder • Built for Privacy & Speed"
};
