import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/Layout";
import HomeView from "@/views/HomeView";
import Appo from "@/Appo";
import LoginView from '@/views/LoginView'
import JoinView from '@/views/JoinView'
import MemberModifyView from '@/views/MemberModifyView'
// Character
import SkillsView from "@/views/character/SkillsView";
import StatsView from "@/views/character/StatsView";
import AchievementsView from "@/views/character/AchievementsView";
import ProfileView from "@/views/character/ProfileView";
// Market
import MarketView from "@/views/shop/MarketView";
// Inventory
import EquipmentView from "@/views/inventory/EquipmentView";
import ItemsView from "@/views/inventory/ItemsView";
// About
import CompanyView from "@/views/about/CompanyView";
import NewsView from "@/views/about/NewsView";
import BoardView from "@/views/about/BoardView";
// Setting
import SettingsView from "@/views/setting/SettingsView";
import MessageView from "@/views/setting/MessageView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
        {/* character */}
        <Route path="/character/skills" element={<SkillsView />} />
        <Route path="/character/stats" element={<StatsView />} />
        <Route path="/character/achievements" element={<AchievementsView />} />
        <Route path="/character/profile" element={<ProfileView />} />
        {/* Market */}
        <Route path="/shop/market" element={<MarketView />} />
        {/* Inventory */}
        <Route path="/inventory/equipment" element={<EquipmentView />} />
        <Route path="/inventory/items" element={<ItemsView />} />
        {/* About */}
        <Route path="/about/company" element={<CompanyView />} />
        <Route path="/about/news" element={<NewsView />} />
        <Route path="/about/board" element={<BoardView />} />
        {/* Setting */}
        <Route path="/setting/settings" element={<SettingsView />} />
        <Route path="/setting/message" element={<MessageView />} />
        <Route path="/app" element={<Appo />} />
        <Route path="/login" element={ <LoginView /> } />
        <Route path="/join" element={ <JoinView /> } />
        <Route path="/memberModify" element={ <MemberModifyView /> } />
      </Route>
    </Routes>
  );
};

export default App;
