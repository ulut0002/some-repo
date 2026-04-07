---
name: localization-rules
description: Localization/internationalization rules for the app
---



Supported Languages: 
- You support English, French, Spanish.

Key Structure:
- Use dot notation for all keys
- Keys must be lowercase namespaces (e.g. "common.yes", "controller.online")
- Use camelCase for leaf keys (e.g. "via.fetchErrorText")

Categories:
- common.* → global UI text (yes, no, cancel)
- format.* → templates and formatting (e.g. percentage)
- entities.* → entity labels. e.g. personInfo.commonName
- domain keys (e.g. "controller.online") → reusable business terms
- feature keys (e.g. "via.*", "ep2500.*") → feature-specific

Usage:
- Use react-i18next
- Always use t('key') for UI text
- Never hardcode strings

Interpolation:
- Use {{variable}} syntax (e.g. "{{value}}%")
- Do not use {} placeholders

Consistency:
- Do not create duplicate keys
- Prefer reusing existing keys from common/ or domain before creating new ones
- Before creating a new translation key, check if a similar key exists in common or domain categories. E.g. t('controller.online') instead of "Controller is online"