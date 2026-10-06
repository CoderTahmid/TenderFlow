/**
 * Validates the structure of uploaded requirements.json
 */
export function validateRequirementsJson(jsonContent) {
  try {
    let data = jsonContent;
    if (typeof jsonContent === 'string') {
      data = JSON.parse(jsonContent);
    }

    if (!data || typeof data !== 'object') {
      return { valid: false, error: 'invalidJsonError' };
    }

    const { tender, requirements } = data;

    if (!tender || typeof tender !== 'object') {
      return { valid: false, error: 'invalidJsonError' };
    }

    if (!tender.tender_id || !tender.title || !tender.procuring_entity || !tender.bidder || !tender.submission_deadline) {
      return { valid: false, error: 'invalidJsonError' };
    }

    if (!Array.isArray(requirements) || requirements.length === 0) {
      return { valid: false, error: 'invalidJsonError' };
    }

    for (const req of requirements) {
      if (!req.id || typeof req.order !== 'number' || !req.title_en) {
        return { valid: false, error: 'invalidJsonError' };
      }
    }

    // Sort requirements by order
    const sortedRequirements = [...requirements].sort((a, b) => a.order - b.order);

    return {
      valid: true,
      data: {
        tender,
        requirements: sortedRequirements
      }
    };
  } catch (err) {
    return { valid: false, error: 'invalidJsonError' };
  }
}

/**
 * STATUS ENGINE RULES (EXACT REQUIREMENT):
 * Possible statuses:
 * 1. MISSING (Blocking: YES, Red)
 *    - Required document has no matched file.
 * 2. EXPIRY_NEEDED (Blocking: YES, Amber)
 *    - has_expiry = true AND a file is matched BUT no expiry date has been entered.
 * 3. EXPIRED (Blocking: YES, Red)
 *    - Expiry date is before the submission deadline.
 * 4. NOT_PROVIDED (Blocking: NO, Gray)
 *    - Optional document has no matched file.
 * 5. OK (Blocking: NO, Green)
 *    - File is matched and (no expiry OR expiry date is on or after submission deadline).
 * 
 * Note: If expiry date is EXACTLY the submission deadline, status MUST be OK.
 */
export const STATUS_TYPES = {
  MISSING: 'MISSING',
  EXPIRY_NEEDED: 'EXPIRY_NEEDED',
  EXPIRED: 'EXPIRED',
  NOT_PROVIDED: 'NOT_PROVIDED',
  OK: 'OK'
};

export function getDocumentStatus(requirement, matchedFile, expiryDate, submissionDeadline) {
  if (!requirement) {
    return {
      status: STATUS_TYPES.MISSING,
      blocking: true,
      badgeColor: 'red',
      titleKey: 'statusMissing',
      descKey: 'statusMissingDesc'
    };
  }

  // 1. Check if file is matched
  if (!matchedFile) {
    if (requirement.mandatory) {
      return {
        status: STATUS_TYPES.MISSING,
        blocking: true,
        badgeColor: 'red',
        titleKey: 'statusMissing',
        descKey: 'statusMissingDesc'
      };
    } else {
      return {
        status: STATUS_TYPES.NOT_PROVIDED,
        blocking: false,
        badgeColor: 'gray',
        titleKey: 'statusNotProvided',
        descKey: 'statusNotProvidedDesc'
      };
    }
  }

  // File IS matched. Now check expiry if requirement.has_expiry is true.
  if (requirement.has_expiry) {
    if (!expiryDate || String(expiryDate).trim() === '') {
      return {
        status: STATUS_TYPES.EXPIRY_NEEDED,
        blocking: true,
        badgeColor: 'amber',
        titleKey: 'statusExpiryNeeded',
        descKey: 'statusExpiryNeededDesc'
      };
    }

    // Compare YYYY-MM-DD strings directly (lexicographical string comparison works for ISO dates!)
    const expStr = String(expiryDate).trim();
    const deadStr = String(submissionDeadline).trim();

    if (expStr < deadStr) {
      return {
        status: STATUS_TYPES.EXPIRED,
        blocking: true,
        badgeColor: 'red',
        titleKey: 'statusExpired',
        descKey: 'statusExpiredDesc'
      };
    }
  }

  // If we reach here, doc is valid and OK
  return {
    status: STATUS_TYPES.OK,
    blocking: false,
    badgeColor: 'green',
    titleKey: 'statusOk',
    descKey: 'statusOkDesc'
  };
}

/**
 * Calculates overall status for all requirements
 */
export function getOverallValidationSummary(requirements, matches, expiryDates, uploadedFilesMap, submissionDeadline) {
  let totalCount = requirements.length;
  let okCount = 0;
  let missingCount = 0;
  let expiredCount = 0;
  let expiryNeededCount = 0;
  let notProvidedCount = 0;
  let blockingCount = 0;

  const statuses = requirements.map(req => {
    const fileId = matches[req.id];
    const matchedFile = fileId ? uploadedFilesMap[fileId] : null;
    const expiryDate = expiryDates[req.id];

    const result = getDocumentStatus(req, matchedFile, expiryDate, submissionDeadline);

    if (result.blocking) {
      blockingCount++;
    }

    switch (result.status) {
      case STATUS_TYPES.OK:
        okCount++;
        break;
      case STATUS_TYPES.MISSING:
        missingCount++;
        break;
      case STATUS_TYPES.EXPIRED:
        expiredCount++;
        break;
      case STATUS_TYPES.EXPIRY_NEEDED:
        expiryNeededCount++;
        break;
      case STATUS_TYPES.NOT_PROVIDED:
        notProvidedCount++;
        break;
      default:
        break;
    }

    return {
      requirement: req,
      matchedFile,
      expiryDate,
      result
    };
  });

  return {
    totalCount,
    okCount,
    missingCount,
    expiredCount,
    expiryNeededCount,
    notProvidedCount,
    blockingCount,
    isReady: blockingCount === 0,
    statuses
  };
}
