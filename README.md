<p align="center">
  <img src="docs/assets/decision-matrix-hero.svg" alt="Tiny Decision Matrix" width="100%" />
</p>

<p align="center">
  <strong>تصمیم‌های چندمعیاره را ساده، شفاف و قابل توضیح کن.</strong>
</p>

<p align="center">
  <a href="README.md">🇮🇷 فارسی</a> · <a href="README.en.md">🇬🇧 English</a>
</p>

<p align="center">
  <img alt="TinyManager Module" src="https://img.shields.io/badge/TinyManager-Module-2563EB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" />
  <img alt="RTL LTR" src="https://img.shields.io/badge/FA%20RTL%20%7C%20EN%20LTR-Native-0F766E" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-111827" />
</p>

# Tiny Decision Matrix

**Tiny Decision Matrix** اولین Reference Module رسمی TinyManager است. این ابزار به مدیر کمک می‌کند چند گزینه را بر اساس معیارهای وزن‌دار مقایسه کند و نتیجه‌ای قابل توضیح به دست آورد.

مثال‌ها:

- انتخاب تأمین‌کننده
- انتخاب نرم‌افزار
- اولویت‌بندی پروژه‌ها
- انتخاب محل شعبه
- مقایسه نامزدهای یک تصمیم مدیریتی

## ایده اصلی

برای هر معیار یک وزن تعیین می‌شود و هر گزینه در آن معیار امتیاز می‌گیرد.

```text
Weighted score = criterion weight × option score
```

جمع امتیازهای وزن‌دار، رتبه نهایی گزینه را می‌سازد.

## دو حالت اجرا

### Standalone

این Repository به‌تنهایی یک Micro App کامل است.

### TinyManager Module

همان Domain Logic از طریق Manifest و Module entry داخل TinyManager استفاده می‌شود.

هیچ منطق محاسباتی برای حالت Integrated دوباره نوشته نمی‌شود.

## قابلیت‌های نسخه Alpha

- معیارهای قابل افزودن/حذف
- وزن 0 تا 100 برای هر معیار
- گزینه‌های قابل افزودن/حذف
- امتیاز 0 تا 10
- رتبه‌بندی خودکار
- نمایش سهم هر گزینه
- فارسی/English
- RTL/LTR
- ذخیره Local-first
- Export JSON
- قرارداد TinyManager Module

## Stack

```text
TypeScript
React
Vite
Tailwind CSS
Lucide Icons
```

## ساختار

```text
src/
├── domain/        # منطق تصمیم، بدون React
├── module/        # اتصال به TinyManager
├── standalone/    # پوسته مستقل
└── components/    # UI مشترک
```

## راه‌اندازی

```bash
git clone https://github.com/webtanan-sketch/tiny-decision-matrix.git
cd tiny-decision-matrix
npm install
npm run dev
```

## ارتباط با TinyManager

Core:

https://github.com/webtanan-sketch/tinymanager

## اصول داده

داده تاریخ‌دار در صورت اضافه‌شدن، با ISO ذخیره می‌شود. در حالت TinyManager، Storage و Date Service از Core تزریق می‌شوند.

## License

MIT © 2026 Webtanan
