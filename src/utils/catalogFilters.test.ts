import test from 'node:test';
import assert from 'node:assert/strict';
import { INSIGHT_ARTICLES, PORTFOLIO_ITEMS, SERVICES } from '../data/agencyData';
import {
  filterInsights,
  filterPortfolio,
  filterServices,
  getPathForRoute,
  resolveRouteFromPath,
} from './catalogFilters';

test('resolveRouteFromPath maps URLs cleanly and falls back to home', () => {
  assert.equal(resolveRouteFromPath('/'), 'home');
  assert.equal(resolveRouteFromPath('/services/'), 'services');
  assert.equal(resolveRouteFromPath('/work'), 'portfolio');
  assert.equal(resolveRouteFromPath('/blog'), 'insights');
  assert.equal(resolveRouteFromPath('/unknown-route'), 'home');
  assert.equal(getPathForRoute('home'), '/');
  assert.equal(getPathForRoute('contact'), '/contact');
});

test('filterServices returns all 9 core services for All and narrows by category and keyword', () => {
  assert.equal(filterServices(SERVICES, 'All').length, 9);
  const aiServices = filterServices(SERVICES, 'AI & Automation');
  assert.equal(aiServices.length, 2);
  assert.ok(aiServices.some((s) => s.id === 'ai-powered-content-creation'));
  assert.ok(aiServices.some((s) => s.id === 'youtube-facebook-automation'));

  const ghost = filterServices(SERVICES, 'All', 'ghostwriting');
  assert.equal(ghost.length, 1);
  assert.equal(ghost[0].id, 'ghostwriting');
});

test('filterPortfolio narrows engagements by discipline and organization keyword', () => {
  assert.equal(filterPortfolio(PORTFOLIO_ITEMS, 'All').length, PORTFOLIO_ITEMS.length);
  const socialPr = filterPortfolio(PORTFOLIO_ITEMS, 'Social Media & PR');
  assert.equal(socialPr.length, 1);
  assert.equal(socialPr[0].organization, 'Sheher Saaz Private Limited');

  const placemaking = filterPortfolio(PORTFOLIO_ITEMS, 'All', 'placemaking');
  assert.equal(placemaking.length, 1);
  assert.equal(placemaking[0].id, 'placemaking-pakistan-ecosystem');
});

test('filterInsights returns matching articles for selected category', () => {
  assert.equal(filterInsights(INSIGHT_ARTICLES, 'All').length, INSIGHT_ARTICLES.length);
  const aiArticles = filterInsights(INSIGHT_ARTICLES, 'AI & Production');
  assert.equal(aiArticles.length, 1);
});
