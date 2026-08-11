// ---------- Types ----------

interface CardLayoutItem {
    id: number;
    section: number;
    fieldKey: string;
    sortOrder: number;
    groupId: string;
    groupName: string;
}

// Field detail kept inside each group — enough to fully reconstruct the
// original CardLayoutItem without needing an external lookup.
interface ProfileFieldDetail {
    id: number;
    fieldKey: string;
}

interface ProfileFieldGroup {
    id: string;
    groupName: string;
    fields: ProfileFieldDetail[];
}

interface ProfileSection {
    sectionName: string;
    id: string;
    sectionNumber: number; // keeps the original numeric section so we can round-trip
    fieldGroups: ProfileFieldGroup[];
}

interface ProfileSectionsResult {
    profileSections: ProfileSection[];
}

// ---------- organize: CardLayoutItem[] -> ProfileSectionsResult ----------
// No external config needed — sections are derived straight from `item.section`,
// same way groups are derived from `item.groupId`.

export function organizeProfileSections(
    items: CardLayoutItem[]
): ProfileSectionsResult {
    const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);

    const sectionOrder: number[] = [];
    const sectionsMap = new Map<number, CardLayoutItem[]>();

    sorted.forEach((item) => {
        if (!sectionsMap.has(item.section)) {
            sectionsMap.set(item.section, []);
            sectionOrder.push(item.section);
        }
        sectionsMap.get(item.section)!.push(item);
    });

    const profileSections: ProfileSection[] = sectionOrder.map(
        (sectionNumber) => {
            const sectionItems = sectionsMap.get(sectionNumber)!;

            const groupOrder: string[] = [];
            const groupsMap = new Map<string, ProfileFieldDetail[]>();
            const groupNames = new Map<string, string>();

            sectionItems.forEach((item) => {
                if (!groupsMap.has(item.groupId)) {
                    groupsMap.set(item.groupId, []);
                    groupNames.set(item.groupId, item.groupName);
                    groupOrder.push(item.groupId);
                }
                groupsMap.get(item.groupId)!.push({
                    id: item.id,
                    fieldKey: item.fieldKey,
                });
            });

            const fieldGroups: ProfileFieldGroup[] = groupOrder.map((groupId) => ({
                id: groupId,
                groupName: groupNames.get(groupId)!,
                fields: groupsMap.get(groupId)!,
            }));

            return {
                sectionName: `section ${sectionNumber}`,
                id: String(sectionNumber),
                sectionNumber,
                fieldGroups,
            };
        }
    );

    return { profileSections };
}

// ---------- flatten: ProfileSectionsResult -> CardLayoutItem[] ----------
// Everything needed (fieldKey, label, groupName) now lives on the
// structure itself, so no external lookup is required.

export function flattenProfileSections(
    data: ProfileSectionsResult
): CardLayoutItem[] {
    const items: CardLayoutItem[] = [];

    data.profileSections.forEach((section) => {
        section.fieldGroups.forEach((group) => {
            group.fields.forEach((field, sortOrder) => {
                items.push({
                    id: field.id,
                    section: section.sectionNumber,
                    fieldKey: field.fieldKey,
                    sortOrder,
                    groupId: group.id,
                    groupName: group.groupName,
                });
            });
        });
    });

    return items;
}

// const backToFlat = flattenProfileSections(organized);
// console.log(JSON.stringify(backToFlat, null, 2));