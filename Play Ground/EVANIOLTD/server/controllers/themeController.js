import ThemeSettings from '../models/ThemeSettings.js';

export const getThemeSettings = async (req, res) => {
  try {
    const settings = await ThemeSettings.getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateThemeSettings = async (req, res) => {
  try {
    let settings = await ThemeSettings.findOne();
    
    if (!settings) {
      settings = await ThemeSettings.create({
        ...req.body,
        updatedBy: req.user._id,
      });
    } else {
      settings = await ThemeSettings.findByIdAndUpdate(
        settings._id,
        {
          ...req.body,
          updatedBy: req.user._id,
        },
        { new: true, runValidators: true }
      );
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error updating theme settings:', error);
    res.status(500).json({ message: error.message || 'Failed to update theme settings.' });
  }
};





