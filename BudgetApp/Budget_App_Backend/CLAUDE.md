# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
# Build
dotnet build

# Run (starts the web server, default: https://localhost:7xxx)
dotnet run --project BudgetApp

# Watch mode (auto-reloads on file changes)
dotnet watch --project BudgetApp

# Run tests (no test project yet)
dotnet test
```

The SDK version is pinned to .NET 9 via `global.json` (`rollForward: latestMinor`).

## Architecture

ASP.NET Core MVC app targeting .NET 9. The default route maps to `BudgetController/Index`.

**Models** (`BudgetApp/Models/`) — plain C# classes with no persistence layer yet. Each has `Amount`/`Salary`, `Frequency`, and `Category` properties:
- `Expenses` — a single expense entry
- `Income` — a single income entry
- `Savings` — a single savings entry
- `ErrorViewModel` — standard MVC error display

**Controllers** (`BudgetApp/Controllers/BudgetController.cs`) — single controller serving `Index`, `Privacy`, and `Error` views. No model data is passed to views yet.

**Views** (`BudgetApp/Views/Budget/`) — Razor views using Bootstrap 5 and jQuery. Shared layout in `Views/Shared/_Layout.cshtml`.

The app has no database, authentication, or service layer. The next natural step is wiring the domain models into the controller and views to display/calculate budget data.
I do not want Claude to write any code for me Claude is installed to help me with the project only. I am a student learning Software Engineering 
If I need you to or ask directly you can give me an example of what I need to do or syntax so I understand what it should look like. 
If I am completely stuck you can give me more help but you never make changes to my project. 
This budgeting app is the 2nd of my 3 capstone projects for my resume and portfolio website.