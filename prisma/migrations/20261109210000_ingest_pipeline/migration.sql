-- CreateTable
CREATE TABLE "SourceDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "kind" TEXT NOT NULL,
    "publishedAt" DATETIME,
    "fetchedAt" DATETIME,
    "contentHash" TEXT,
    "localPath" TEXT,
    "mimeType" TEXT,
    "textExtract" TEXT,
    "status" TEXT NOT NULL DEFAULT 'discovered',
    "parseError" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VoteExtraction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "plainTitle" TEXT,
    "date" DATETIME,
    "stage" TEXT,
    "votesFor" INTEGER,
    "votesAgainst" INTEGER,
    "abstentions" INTEGER,
    "result" TEXT,
    "confidence" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'needs_review',
    "rawSnippet" TEXT,
    "proposalId" TEXT,
    "voteId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VoteExtraction_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "SourceDocument" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IngestRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" DATETIME,
    "ok" BOOLEAN NOT NULL DEFAULT false,
    "statsJson" TEXT,
    "error" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "SourceDocument_url_key" ON "SourceDocument"("url");

-- CreateIndex
CREATE INDEX "VoteExtraction_status_idx" ON "VoteExtraction"("status");

-- CreateIndex
CREATE INDEX "VoteExtraction_documentId_idx" ON "VoteExtraction"("documentId");
